import type { AppProps } from "next/app";
import { useMemo } from "react";
import merge from "deepmerge";
import { IncomingHttpHeaders } from "http";
import fetch from "isomorphic-unfetch";
import isEqual from "lodash/isEqual";

import { createUploadLink } from "apollo-upload-client";
import { SubscriptionClient } from "subscriptions-transport-ws";

import { RetryLink } from "@apollo/client/link/retry";
import { getMainDefinition } from "@apollo/client/utilities";
import { ApolloClient, ApolloLink, InMemoryCache, NormalizedCacheObject } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { WebSocketLink } from "@apollo/client/link/ws";

import { getApiUrl } from "@utils/getApiUrl";

let apolloClient: ApolloClient<NormalizedCacheObject> | undefined;

process.env["NODE_TLS_REJECT_UNAUTHORIZED"] = String(0);

const createApolloClient = (headers: IncomingHttpHeaders | null = null) => {
    const enhancedFetch = (url: RequestInfo, init: RequestInit) => {
        return fetch(url, {
            ...init,
            headers: {
                ...init.headers,
                "Access-Control-Allow-Origin": "*",
                Cookie: headers?.cookie ?? "",
            },
        }).then(response => response);
    };

    const { http, websocket } = getApiUrl();
    const createHttpLink = () => {
        return createUploadLink({
            uri: http,
            fetchOptions: {
                mode: "cors",
            },
            credentials: "include",
            fetch: enhancedFetch,
        });
    };

    const createWSLink = () => {
        const httpLink = createHttpLink();
        if (!websocket) {
            return createHttpLink();
        }

        return new RetryLink().split(
            sys => {
                const mainDefinition = getMainDefinition(sys.query);
                if ("operation" in mainDefinition) {
                    return mainDefinition.operation === "subscription";
                }

                return false;
            },
            new WebSocketLink(
                new SubscriptionClient(websocket, {
                    lazy: true,
                    reconnect: true,
                }),
            ),
            httpLink,
        );
    };

    const fetchLink = typeof window === "undefined" ? createHttpLink() : createWSLink();

    return new ApolloClient({
        ssrMode: typeof window === "undefined",
        link: ApolloLink.from([
            onError(({ graphQLErrors, networkError }) => {
                if (graphQLErrors)
                    graphQLErrors.forEach(({ message, locations, path }) =>
                        console.error(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`),
                    );
                if (networkError)
                    console.error(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
            }),
            // this uses apollo-link-http under the hood, so all the options here come from that package
            fetchLink,
        ]),
        cache: new InMemoryCache({
            typePolicies: {},
        }),
    });
};

type InitialState = NormalizedCacheObject | undefined;

interface IInitializeApollo {
    headers?: IncomingHttpHeaders | null;
    initialState?: InitialState | null;
}

export const initializeApollo = (
    { headers, initialState }: IInitializeApollo = { headers: null, initialState: null },
) => {
    const localApolloClient = apolloClient ?? createApolloClient(headers);

    // If your page has Next.js data fetching methods that use Apollo Client, the initial stat
    // get hydrated here
    if (initialState) {
        const existingCache = localApolloClient.extract();
        const data = merge(initialState, existingCache, {
            // combine arrays using object equality (like in sets)
            arrayMerge: (destinationArray, sourceArray) => [
                ...sourceArray,
                ...destinationArray.filter(d => sourceArray.every(s => !isEqual(d, s))),
            ],
        });

        // Restore the cache with the merged data
        localApolloClient.cache.restore(data);
    }

    // For SSG and SSR always create a new Apollo Client
    if (typeof window === "undefined") return localApolloClient;
    // Create the Apollo Client once in the client
    if (!apolloClient) apolloClient = localApolloClient;

    return localApolloClient;
};

export function useApollo(pageProps: AppProps["pageProps"]) {
    const state = pageProps.__APOLLO_STATE__;
    return useMemo(() => initializeApollo({ initialState: state }), [state]);
}

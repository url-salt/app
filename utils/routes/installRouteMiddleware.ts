import type { GetServerSideProps, GetServerSidePropsResult } from "next";
import type { ApolloClient } from "@apollo/client";

import { initializeApollo } from "@apollo/lib";

import { BasePageProps, Nullable, UrlEntry } from "@utils/types";
import { getUrlEntryAction } from "@actions/getUrlEntry";

export type OptionValue<T, TProps extends BasePageProps> =
    | false
    | Nullable<T>
    | ((...args: Parameters<GetServerSideProps<TProps>>) => Nullable<T> | Promise<Nullable<T>>);

interface Options<TProps extends BasePageProps> {
    needUrlEntry: OptionValue<string, TProps>;
}

interface Data {
    apolloClient: ApolloClient<object>;
    urlEntry: Nullable<UrlEntry>;
}

type RouteMiddlewareClient<TProps extends BasePageProps> = (
    data: Data,
    ...args: Parameters<GetServerSideProps<TProps>>
) => Promise<GetServerSidePropsResult<TProps>>;

async function acquireOptionValue<TValue extends string | boolean | number, TProps extends BasePageProps>(
    target: Nullable<OptionValue<TValue, TProps>>,
    ...params: Parameters<GetServerSideProps<TProps>>
) {
    if (!target) {
        return false;
    }

    if (typeof target === "function") {
        return target(...params);
    }

    return target;
}

export function installRouteMiddleware<TProps extends BasePageProps>(
    options?: Partial<Options<TProps>>,
): (client: RouteMiddlewareClient<TProps>) => GetServerSideProps<TProps> {
    const { needUrlEntry = false } = options || {};

    return client => {
        return async params => {
            const { req } = params;
            const apolloClient = initializeApollo({ headers: req.headers });

            try {
                let urlEntry: Nullable<UrlEntry> = null;
                const targetUrlEntryId = await acquireOptionValue(needUrlEntry, params);
                if (targetUrlEntryId) {
                    urlEntry = await getUrlEntryAction(apolloClient, targetUrlEntryId);
                }

                return client({ apolloClient, urlEntry }, params);
            } catch (e) {
                return { notFound: true };
            }
        };
    };
}

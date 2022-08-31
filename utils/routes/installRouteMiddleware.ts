import type { GetServerSideProps, GetServerSidePropsResult } from "next";
import type { ApolloClient } from "@apollo/client";

import { BasePageProps, HomePageContent, Nullable } from "@utils/types";
import { getHomePageContentAction } from "actions/getHomePageContent";
import { initializeApollo } from "@apollo/lib";

interface Options {
    needHomePageContent?: boolean;
}

interface Data {
    apolloClient: ApolloClient<object>;
    homePageContent: Nullable<HomePageContent>;
}

type RouteMiddlewareClient<TProps extends BasePageProps> = (
    data: Data,
    ...args: Parameters<GetServerSideProps<TProps>>
) => Promise<GetServerSidePropsResult<TProps>>;

export function installRouteMiddleware<TProps extends BasePageProps>(
    options?: Options,
): (client: RouteMiddlewareClient<TProps>) => GetServerSideProps<TProps> {
    const { needHomePageContent = false } = options || {};

    return client => {
        return async params => {
            const { req } = params;
            const apolloClient = initializeApollo({ headers: req.headers });

            try {
                let homePageContent: Nullable<HomePageContent> = null;
                if (needHomePageContent) {
                    homePageContent = await getHomePageContentAction(apolloClient);
                }

                return client({ apolloClient, homePageContent }, params);
            } catch (e) {
                return { notFound: true };
            }
        };
    };
}

import { ApolloClient } from "@apollo/client";
import { HomePageContentDocument, HomePageContentQuery, HomePageContentQueryVariables } from "queries/index";

export async function getHomePageContentAction(client: ApolloClient<object>) {
    const { data } = await client.query<HomePageContentQuery, HomePageContentQueryVariables>({
        query: HomePageContentDocument,
    });

    return data;
}

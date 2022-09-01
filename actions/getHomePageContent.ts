import { ApolloClient } from "@apollo/client";
import { HomePageContentDocument, HomePageContentQuery, HomePageContentQueryVariables } from "@apollo/queries";

export async function getHomePageContentAction(client: ApolloClient<object>) {
    const { data } = await client.query<HomePageContentQuery, HomePageContentQueryVariables>({
        query: HomePageContentDocument,
    });

    return data;
}

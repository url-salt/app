import { ApolloClient } from "@apollo/client";
import { UrlDocument, UrlQuery, UrlQueryVariables } from "@apollo/queries";

export async function getUrlEntryAction(client: ApolloClient<object>, id: string) {
    const { data } = await client.query<UrlQuery, UrlQueryVariables>({
        query: UrlDocument,
        variables: {
            id,
        },
    });

    return data.url;
}

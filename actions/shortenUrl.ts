import { ApolloClient } from "@apollo/client";
import { ShortenUrlDocument, ShortenUrlMutation, ShortenUrlMutationVariables } from "@apollo/queries";

export async function shortenUrlAction(client: ApolloClient<object>, url: string) {
    const { data } = await client.mutate<ShortenUrlMutation, ShortenUrlMutationVariables>({
        mutation: ShortenUrlDocument,
        variables: {
            url,
        },
    });

    if (!data) {
        throw new Error("Undefined error.");
    }

    return data.shortenUrl;
}

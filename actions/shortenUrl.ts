import { ApolloClient } from "@apollo/client";
import { ShortenUrlDocument, ShortenUrlMutation, ShortenUrlMutationVariables } from "@apollo/queries";

import { SettingsValue } from "@utils/types";

export async function shortenUrlAction(client: ApolloClient<object>, url: string, settings: SettingsValue | null) {
    const { data } = await client.mutate<ShortenUrlMutation, ShortenUrlMutationVariables>({
        mutation: ShortenUrlDocument,
        variables: {
            url,
            settings,
        },
    });

    if (!data) {
        throw new Error("Undefined error.");
    }

    return data.shortenUrl;
}

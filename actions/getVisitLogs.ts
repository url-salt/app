import { ApolloClient } from "@apollo/client";
import { VisitLogsDocument, VisitLogsQuery, VisitLogsQueryVariables } from "@apollo/queries";

import { Nullable, VisitLog } from "@utils/types";

export async function getVisitLogsAction(
    apolloClient: ApolloClient<object>,
    code: string,
    take: number,
    before: Nullable<number>,
): Promise<VisitLog[]> {
    const { data } = await apolloClient.query<VisitLogsQuery, VisitLogsQueryVariables>({
        query: VisitLogsDocument,
        variables: {
            take,
            code,
            before,
        },
    });

    if (!data.url) {
        throw new Error("Failed to query during acquiring visit logs.");
    }

    return data.url.visitLogs;
}

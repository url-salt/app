import type { NextPage } from "next";

import { useApolloClient } from "@apollo/client";

import AnalyticsPage from "@pages/Analytics";

import { installRouteMiddleware } from "@utils/routes/installRouteMiddleware";
import { checkParams } from "@utils/checkParams";
import { BasePageProps, UrlEntry } from "@utils/types";

interface AnalyticsRouteProps extends BasePageProps {
    urlEntry: UrlEntry;
}

const AnalyticsRoute: NextPage<AnalyticsRouteProps> = ({ urlEntry }) => {
    const client = useApolloClient();

    return <AnalyticsPage client={client} urlEntry={urlEntry} />;
};

export const getServerSideProps = installRouteMiddleware<AnalyticsRouteProps>({
    needUrlEntry: ({ params }) => {
        const id = params?.id;
        if (!checkParams(id)) {
            return null;
        }

        return id;
    },
})(async ({ urlEntry }) => {
    if (!urlEntry) {
        return { notFound: true };
    }

    return {
        props: {
            urlEntry,
        },
    };
});

export default AnalyticsRoute;

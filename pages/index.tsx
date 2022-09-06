import type { NextPage } from "next";

import { useApolloClient } from "@apollo/client";

import HomePage from "@pages/Home";

import { installRouteMiddleware } from "@utils/routes/installRouteMiddleware";
import { BasePageProps } from "@utils/types";

interface HomePageProps extends BasePageProps {}

const Home: NextPage<HomePageProps> = () => {
    const apolloClient = useApolloClient();

    return <HomePage apolloClient={apolloClient} />;
};

export const getServerSideProps = installRouteMiddleware<HomePageProps>({})(async () => {
    return {
        props: {
            layoutProps: {
                headerProps: {
                    float: true,
                },
            },
        },
    };
});

export default Home;

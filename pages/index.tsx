import type { NextPage } from "next";

import { useApolloClient } from "@apollo/client";

import HomePage from "@pages/Home";

import { installRouteMiddleware } from "@utils/routes/installRouteMiddleware";
import { BasePageProps, HomePageContent } from "@utils/types";

interface HomePageProps extends BasePageProps {
    homePageContent: HomePageContent;
}

const Home: NextPage<HomePageProps> = ({ homePageContent }) => {
    const apolloClient = useApolloClient();

    return <HomePage content={homePageContent} apolloClient={apolloClient} />;
};

export const getServerSideProps = installRouteMiddleware<HomePageProps>({
    needHomePageContent: true,
})(async ({ homePageContent }) => {
    if (!homePageContent) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            homePageContent,
        },
    };
});

export default Home;

import type { NextPage } from "next";

import { installRouteMiddleware } from "@utils/routes/installRouteMiddleware";

import HomePage from "@pages/Home";

import { BasePageProps, HomePageContent } from "@utils/types";

interface HomePageProps extends BasePageProps {
    homePageContent: HomePageContent;
}

const Home: NextPage<HomePageProps> = ({ homePageContent }) => {
    return <HomePage content={homePageContent} />;
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

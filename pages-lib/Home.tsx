import React from "react";

import { Box, Typography } from "@mui/material";

import { HomePageContent } from "@utils/types";

import { Root } from "@pages/Home.styles";

export interface HomePageProps {
    content: HomePageContent;
}
export interface HomePageStates {}

export default class HomePage extends React.Component<HomePageProps, HomePageStates> {
    public render() {
        const { content } = this.props;

        return (
            <Box p={4}>
                <Root>
                    <Typography fontWeight={500} fontSize="2rem" variant="h2">
                        {content.helloWorld}!
                    </Typography>
                    <Typography variant="body1">{content.latestStartedTime.startedAt}</Typography>
                </Root>
            </Box>
        );
    }
}

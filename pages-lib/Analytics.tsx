import React from "react";
import { format } from "date-fns";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import VisitLogTable from "@components/VisitLogTable";

import { ApolloClient } from "@apollo/client";

import { Root } from "@pages/Analytics.styles";

import { getVisitLogsAction } from "@actions/getVisitLogs";
import { VISIT_LOG_MINIMAL_ROW_COUNT } from "@constants/analytics";

import { Nullable, UrlEntry, VisitLog } from "@utils/types";

export interface AnalyticsPageProps {
    urlEntry: UrlEntry;
    client: ApolloClient<object>;
}
export interface AnalyticsPageStates {
    visitLogs: VisitLog[] | null;
}

export default class AnalyticsPage extends React.Component<AnalyticsPageProps, AnalyticsPageStates> {
    public state: AnalyticsPageStates = {
        visitLogs: null,
    };

    private handleLoadMore = async (lastItem: Nullable<VisitLog>) => {
        const { client, urlEntry } = this.props;
        return await getVisitLogsAction(client, urlEntry.uniqueId, VISIT_LOG_MINIMAL_ROW_COUNT, lastItem?.id);
    };

    private renderGridItem = (title: string, content: Nullable<string | number>) => {
        return (
            <Grid item xs={4}>
                <Typography variant="h6" fontWeight="bold" fontSize="1.1rem">
                    {title}
                </Typography>
                <Typography variant="body1" fontWeight="500">
                    {content === undefined || content === null ? "(none)" : content}
                </Typography>
            </Grid>
        );
    };
    public render() {
        const { urlEntry } = this.props;

        return (
            <Container maxWidth="lg">
                <Box pt={0}>
                    <Root>
                        <Box display="flex" alignItems="flex-start" mb={6}>
                            <Box>
                                <Typography
                                    display="block"
                                    component="a"
                                    href={urlEntry.url}
                                    variant="h3"
                                    fontSize="1.75rem"
                                    fontWeight="900"
                                    color="inherit"
                                    sx={{ mb: 0.5, textDecoration: "none" }}
                                >
                                    <Box component="span" sx={{ textDecoration: "underline" }}>
                                        {urlEntry.url}
                                    </Box>
                                    {" 🔗"}
                                </Typography>
                                <Typography
                                    component="a"
                                    href={urlEntry.originalUrl}
                                    variant="body1"
                                    color="rgba(0, 0, 0, 0.5)"
                                    sx={{ textDecoration: "none" }}
                                >
                                    {urlEntry.originalUrl}
                                </Typography>
                            </Box>
                            <Box flex="1 1 auto" />
                            <Button color="error">delete this</Button>
                        </Box>
                        <Box mb={12}>
                            <Grid container spacing={2}>
                                {this.renderGridItem("Title", urlEntry.title)}
                                {this.renderGridItem("Description", urlEntry.description)}
                                <Grid item xs={4}></Grid>
                                {this.renderGridItem("Hits", 0)}
                                {this.renderGridItem("Recent visit at", 0)}
                                {this.renderGridItem("Created at", format(urlEntry.createdAt, "yyyy-MM-dd hh:mm:ss"))}
                            </Grid>
                        </Box>
                        <Box mb={4}>
                            <Typography
                                display="block"
                                variant="h5"
                                fontSize="1.5rem"
                                fontWeight="600"
                                color="inherit"
                                sx={{ mb: 2, textDecoration: "none" }}
                            >
                                Recent visits
                            </Typography>
                            <VisitLogTable loadMore={this.handleLoadMore} minimumRows={10} />
                        </Box>
                    </Root>
                </Box>
            </Container>
        );
    }
}

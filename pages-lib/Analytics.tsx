import React from "react";
import { format } from "date-fns";

import { Box, Button, Container, Grid, Typography } from "@mui/material";

import VisitLogTable, { VisitLogTableProps } from "@components/VisitLogTable";

import { ApolloClient } from "@apollo/client";

import { Indicator, Root } from "@pages/Analytics.styles";

import { getVisitLogsAction } from "@actions/getVisitLogs";
import { VISIT_LOG_MINIMAL_ROW_COUNT } from "@constants/analytics";

import { Nullable, UrlEntry, VisitLog } from "@utils/types";
import { VisitLogAddedComponent, VisitLogAddedComponentProps } from "@apollo/queries";
import memoizeOne from "memoize-one";

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

    private handleSubscriptionData = memoizeOne(
        (callback: (log: VisitLog) => void): VisitLogAddedComponentProps["onSubscriptionData"] => {
            return ({ subscriptionData }) => {
                console.info(subscriptionData);
                if (!subscriptionData.data || !subscriptionData.data.visitLogAdded) {
                    return;
                }

                callback(subscriptionData.data.visitLogAdded);
            };
        },
    );
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
    private renderSubscription: VisitLogTableProps["renderSubscription"] = callback => {
        return (
            <VisitLogAddedComponent
                variables={{ uniqueId: this.props.urlEntry.uniqueId }}
                onSubscriptionData={this.handleSubscriptionData(callback)}
            />
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
                                {this.renderGridItem("Hits", urlEntry.hits)}
                                {this.renderGridItem(
                                    "Recent visit at",
                                    urlEntry.visitLogs.length > 0
                                        ? format(urlEntry.visitLogs[0].createdAt, "yyyy-MM-dd hh:mm:ss")
                                        : "(none)",
                                )}
                                {this.renderGridItem("Created at", format(urlEntry.createdAt, "yyyy-MM-dd hh:mm:ss"))}
                            </Grid>
                        </Box>
                        <Box mb={4}>
                            <Box mb={2} display="flex" alignItems="center">
                                <Typography
                                    display="block"
                                    variant="h5"
                                    fontSize="1.5rem"
                                    fontWeight="600"
                                    color="inherit"
                                    sx={{ textDecoration: "none" }}
                                >
                                    Recent visits
                                </Typography>
                                <Indicator />
                            </Box>
                            <VisitLogTable
                                renderSubscription={this.renderSubscription}
                                loadMore={this.handleLoadMore}
                                minimumRows={VISIT_LOG_MINIMAL_ROW_COUNT}
                            />
                        </Box>
                    </Root>
                </Box>
            </Container>
        );
    }
}

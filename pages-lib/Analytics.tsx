import React from "react";

import {
    Box,
    Button,
    Container,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import { Root } from "@pages/Analytics.styles";

import { Nullable, UrlEntry } from "@utils/types";

export interface AnalyticsPageProps {
    urlEntry: UrlEntry;
}
export interface AnalyticsPageStates {}

export default class AnalyticsPage extends React.Component<AnalyticsPageProps, AnalyticsPageStates> {
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
                                {this.renderGridItem("Created at", urlEntry.createdAt)}
                            </Grid>
                        </Box>
                        <Box>
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
                            <TableContainer component={Box} borderRadius="4px" border="1px solid #ccc">
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>IP</TableCell>
                                            <TableCell align="right">Country (Country Code)</TableCell>
                                            <TableCell align="right">Time</TableCell>
                                            <TableCell align="right">Is Bot?</TableCell>
                                            <TableCell align="right">Browser</TableCell>
                                            <TableCell align="right">OS</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody></TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    </Root>
                </Box>
            </Container>
        );
    }
}

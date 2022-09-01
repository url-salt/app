import React from "react";
import memoizeOne from "memoize-one";
import * as yup from "yup";

import { ApolloClient } from "@apollo/client";

import { Box, Grow, Tooltip, Typography } from "@mui/material";
import ContentPasteIcon from "@mui/icons-material/ContentPaste";

import ShortenerForm, { ShortenerFormValues } from "@components/forms/ShortenerForm";
import { withDialog, WithDialogProps } from "@components/dialog/withDialog";

import { shortenUrlAction } from "@actions/shortenUrl";
import { HomePageContent, ShortenedEntry } from "@utils/types";

import { Pattern, PrettyBox, Root, Title } from "@pages/Home.styles";

export interface HomePageProps extends WithDialogProps {
    content: HomePageContent;
    apolloClient: ApolloClient<object>;
}
export interface HomePageStates {
    inputFocused: boolean;
    boxHovered: boolean;
    entries: ShortenedEntry[];
}

class HomePage extends React.Component<HomePageProps, HomePageStates> {
    public state: HomePageStates = {
        inputFocused: false,
        boxHovered: false,
        entries: [],
    };

    private setBoxState = memoizeOne((status: boolean, targetState: "inputFocused" | "boxHovered") => () => {
        this.setState((prevState: HomePageStates) => {
            const newState = { ...prevState };
            newState[targetState] = status;

            return newState;
        });
    });

    private handleResultBoxClick = async () => {
        const latestEntries = this.state.entries[0];
        if (!latestEntries) {
            return;
        }

        await navigator.clipboard.writeText(latestEntries.url);
        this.props.enqueueSnackbar("shortened URL copied!", {
            variant: "success",
        });
    };
    private handleSubmit = async (value: ShortenerFormValues) => {
        try {
            await yup.string().url().validate(value.url);
        } catch (e) {
            this.props.enqueueSnackbar("The url you input was not valid url.", {
                variant: "error",
            });
            return;
        }

        this.props.setBackdropVisibility(true);

        const entry = await shortenUrlAction(this.props.apolloClient, value.url);
        this.setState(prevState => ({
            entries: [entry, ...prevState.entries],
        }));

        this.props.setBackdropVisibility(false);
    };

    public render() {
        const { inputFocused, boxHovered, entries } = this.state;

        return (
            <Root>
                <Pattern />
                <Box
                    zIndex={10}
                    pt="15vh"
                    pb="25vh"
                    position="relative"
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                >
                    <Title variant="h2" lineHeight={1.1} fontWeight={900} letterSpacing="0.001em" textAlign="center">
                        🧂
                        <br />
                        <br />
                        The best url shortener
                        <br />
                        you{"'"}ve never seen before
                    </Title>
                    <Box mt={12} display="flex" flexDirection="column" alignItems="stretch">
                        <ShortenerForm
                            onSubmit={this.handleSubmit}
                            setBoxState={this.setBoxState}
                            inputFocused={inputFocused}
                            boxHovered={boxHovered}
                        />
                        {entries.length > 0 && (
                            <Grow in={entries.length > 0}>
                                <Box>
                                    <Box mt={4}>
                                        <Typography variant="body1" fontWeight={600}>
                                            your shortened url is right here:
                                        </Typography>
                                    </Box>
                                    <Tooltip title="Click to copy">
                                        <PrettyBox role="button" tabIndex={-1} onClick={this.handleResultBoxClick}>
                                            <span>{entries[0].url}</span>
                                            <Box flex="1 1 auto" />
                                            <ContentPasteIcon />
                                        </PrettyBox>
                                    </Tooltip>
                                </Box>
                            </Grow>
                        )}
                    </Box>
                </Box>
            </Root>
        );
    }
}

export default withDialog(HomePage);

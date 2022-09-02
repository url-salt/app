import type { AppProps } from "next/app";
import Head from "next/head";

import { SnackbarProvider } from "notistack";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@apollo/lib";

import Layout from "@components/Layout";

import { appTheme } from "@styles/theme";
import DialogProvider from "@components/dialog/Provider";

function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <>
            <Head>
                {/* eslint-disable-next-line react/no-unescaped-entities */}
                <title>usalt - The best url shortener you've never seen before</title>
            </Head>
            <ApolloProvider client={apolloClient}>
                <ThemeProvider theme={appTheme}>
                    <SnackbarProvider
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                        }}
                    >
                        <DialogProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </DialogProvider>
                    </SnackbarProvider>
                </ThemeProvider>
            </ApolloProvider>
        </>
    );
}

export default App;

import type { AppProps } from "next/app";

import { ThemeProvider } from "@mui/material";

import { ApolloProvider } from "@apollo/client";
import { useApollo } from "@apollo/lib";

import Layout from "@components/Layout";

import { appTheme } from "@styles/theme";

function App({ Component, pageProps }: AppProps) {
    const apolloClient = useApollo(pageProps);

    return (
        <ApolloProvider client={apolloClient}>
            <ThemeProvider theme={appTheme}>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </ThemeProvider>
        </ApolloProvider>
    );
}

export default App;

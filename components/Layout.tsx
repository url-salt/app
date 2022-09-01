import React from "react";

import { Box, CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";

import Header from "@components/Header";
import Footer from "@components/Footer";

import { GlobalStyles, Root } from "@components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Root>
            <Global styles={GlobalStyles} />
            <CssBaseline />
            <Header />
            <Box component="main">{children}</Box>
            <Box flex="1 1 auto" />
            <Footer />
        </Root>
    );
}

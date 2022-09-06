import React from "react";

import { Box, CssBaseline } from "@mui/material";
import { Global } from "@emotion/react";

import Header, { HeaderProps } from "@components/Header";
import Footer from "@components/Footer";

import { GlobalStyles, Root } from "@components/Layout.styles";

export interface LayoutProps {
    children: React.ReactNode;
    headerProps?: Partial<HeaderProps>;
}

export default function Layout({ children, headerProps }: LayoutProps) {
    return (
        <Root>
            <Global styles={GlobalStyles} />
            <CssBaseline />
            <Header {...headerProps} />
            <Box component="main">{children}</Box>
            <Box flex="1 1 auto" />
            <Footer />
        </Root>
    );
}

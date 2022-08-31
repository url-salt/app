import React from "react";

import { CssBaseline } from "@mui/material";

import { GlobalStyles, Root } from "@components/Layout.styles";
import { Global } from "@emotion/react";

export interface LayoutProps {
    children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
    return (
        <Root>
            <Global styles={GlobalStyles} />
            <CssBaseline />
            {children}
        </Root>
    );
}

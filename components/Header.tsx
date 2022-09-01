import React from "react";
import Link from "next/link";

import { Box } from "@mui/material";

import { Root, Title } from "@components/Header.styles";

export interface HeaderProps {}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        return (
            <Root>
                <Link passHref href="/">
                    <Title
                        color="inherit"
                        component="a"
                        variant="h1"
                        fontSize="2rem"
                        fontWeight={900}
                        sx={{ textDecoration: "none" }}
                    >
                        usalt 🧂
                    </Title>
                </Link>
                <Box flex="1 1 auto" />
            </Root>
        );
    }
}

import React from "react";
import Link from "next/link";

import { Box } from "@mui/material";

import { Root, Title } from "@components/Header.styles";

export interface HeaderProps {
    float?: boolean;
}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        const { float = false } = this.props;

        return (
            <Box top={0} left={0} right={0} position={float ? "absolute" : "static"}>
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
            </Box>
        );
    }
}

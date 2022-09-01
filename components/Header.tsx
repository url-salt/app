import React from "react";
import Link from "next/link";

import { Box, Typography } from "@mui/material";

export interface HeaderProps {}
export interface HeaderStates {}

export default class Header extends React.Component<HeaderProps, HeaderStates> {
    public render() {
        return (
            <Box p={8} display="flex" position="absolute" zIndex={11} top={0} left={0} right={0}>
                <Link passHref href="/">
                    <Typography
                        color="inherit"
                        component="a"
                        href="/"
                        variant="h1"
                        fontSize="2rem"
                        fontWeight={900}
                        sx={{ textDecoration: "none" }}
                    >
                        usalt 🧂
                    </Typography>
                </Link>
                <Box flex="1 1 auto" />
            </Box>
        );
    }
}

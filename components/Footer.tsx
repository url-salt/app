import React from "react";

import { Box, Typography } from "@mui/material";

import { Link, Root } from "@components/Footer.styles";

export interface FooterProps {}
export interface FooterStates {}

export default class Footer extends React.Component<FooterProps, FooterStates> {
    public render() {
        return (
            <Root>
                <Box p={2} py={4} textAlign="center">
                    <Typography fontSize="0.9rem" fontWeight={500}>
                        Made with 🖤 @ <a href="https://github.com/async3619">async3619</a>
                    </Typography>
                    <Box mt={2} display="flex" justifyContent="center">
                        <Link component="a" href="https://github.com/async3619">
                            github
                        </Link>
                        <Link component="a" href="https://discordapp.com/users/978117453806698616">
                            discord
                        </Link>
                        <Link component="a" href="https://sophia-dev.io">
                            blog
                        </Link>
                    </Box>
                </Box>
            </Root>
        );
    }
}

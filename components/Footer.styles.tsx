import styled from "@emotion/styled";
import { Typography } from "@mui/material";

export const Root = styled.footer`
    margin: 0;
    padding: 0;
    border-top: 1px solid #eaeaea;

    overflow: hidden;

    background-color: #fafafa;

    flex: 0 0 auto;

    a {
        color: inherit;
    }
`;

export const Link = styled(Typography)<{ component: "a" } & React.AnchorHTMLAttributes<HTMLAnchorElement>>`
    font-size: 0.9rem;
    font-weight: 500;

    &:not(:last-of-type) {
        margin-right: ${({ theme }) => theme.spacing(1)};
    }
`;

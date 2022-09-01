import styled from "@emotion/styled";
import { Desktop, Mobile } from "@styles/utils";
import { Typography } from "@mui/material";

export const Root = styled.div`
    margin: 0;
    padding: 0;

    position: absolute;
    top: 0;
    left: 0;
    right: 0;

    z-index: 100;

    display: flex;

    ${Mobile} {
        padding: ${({ theme }) => theme.spacing(2)};
    }

    ${Desktop} {
        padding: ${({ theme }) => theme.spacing(8)};
    }
`;

export const Title = styled(Typography)<{ component: "a" }>`
    ${Mobile} {
        font-size: 1.5rem;
    }
`;

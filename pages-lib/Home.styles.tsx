import styled from "@emotion/styled";
import { ButtonBase, Typography } from "@mui/material";

import { Mobile } from "@styles/utils";

export const Root = styled.div`
    margin: 0;
    padding: ${({ theme }) => theme.spacing(0, 2)};

    position: relative;
`;

export const Pattern = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;

    pointer-events: none;

    &:before {
        content: "";

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        opacity: 0.2;

        background: url("/assets/pattern.png") center center;
    }

    &:after {
        content: "";

        height: 150px;

        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;

        background: rgb(255, 255, 255);
        background: linear-gradient(0deg, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 0) 100%);
    }
`;

export const PrettyBox = styled(ButtonBase)`
    width: 100%;

    padding: ${({ theme }) => theme.spacing(2)};
    margin-top: ${({ theme }) => theme.spacing(1)};

    border-radius: 4px;

    display: flex;
    box-sizing: border-box;

    font-size: 1rem;
    text-align: left;

    color: white;
    background: #262a33;

    cursor: pointer;

    box-shadow: ${({ theme }) => theme.shadows[1]};

    transition: ${({ theme }) => theme.transitions.create("box-shadow")};

    &:hover {
        box-shadow: ${({ theme }) => theme.shadows[3]};
    }

    &:active {
        box-shadow: ${({ theme }) => theme.shadows[6]};
    }

    > svg {
        width: ${({ theme }) => theme.spacing(3)};
        height: ${({ theme }) => theme.spacing(3)};

        display: block;

        opacity: 0.5;
    }

    span {
        font-family: "Consolas", monospace;
    }

    > span:first-of-type {
        > span {
            color: #0fa8cd;
        }
    }
`;

export const Title = styled(Typography)`
    font-size: 4rem;

    ${Mobile} {
        font-size: 2rem;
    }
`;

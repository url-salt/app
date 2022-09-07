import styled from "@emotion/styled";
import { keyframes } from "@emotion/react";

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

export const HeartbeatAnimation = keyframes`
    from {
        opacity: 1;
        transform: scale(1);
    }
    
    to {
        opacity: 0;
        transform: scale(2.5);
    }
`;

export const Indicator = styled.div`
    width: ${({ theme }) => theme.spacing(1)};
    height: ${({ theme }) => theme.spacing(1)};

    margin-left: ${({ theme }) => theme.spacing(2)};
    border-radius: 100%;

    position: relative;

    background: ${({ theme }) => theme.palette.primary.main};

    &:before {
        content: "";

        border-radius: 100%;

        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;

        background: ${({ theme }) => theme.palette.primary.main};

        animation: ${HeartbeatAnimation} 2s ease infinite;
    }
`;

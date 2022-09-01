import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const GlobalStyles = css`
    @font-face {
        font-family: "SUIT Variable";
        font-weight: 100 900;
        src: url("/assets/suit.woff2") format("woff2-variations");
    }

    html,
    body,
    #__next {
        height: 100%;

        margin: 0;
        padding: 0;
    }

    * {
        font-family: "SUIT Variable", sans-serif;
    }

    input:-webkit-autofill,
    input:-webkit-autofill:hover,
    input:-webkit-autofill:focus,
    textarea:-webkit-autofill,
    textarea:-webkit-autofill:hover,
    textarea:-webkit-autofill:focus,
    select:-webkit-autofill,
    select:-webkit-autofill:hover,
    select:-webkit-autofill:focus {
        -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;
    }
`;

export const Root = styled.div`
    height: 100%;

    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: column;
    align-items: stretch;
`;

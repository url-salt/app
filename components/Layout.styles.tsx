import styled from "@emotion/styled";
import { css } from "@emotion/react";

export const GlobalStyles = css`
    @font-face {
        font-family: "SUIT Variable";
        font-weight: 100 900;
        src: url("/assets/suit.woff2") format("woff2-variations");
    }

    html,
    body {
        margin: 0;
        padding: 0;
    }

    * {
        font-family: "SUIT Variable", sans-serif;
    }
`;

export const Root = styled.div`
    margin: 0;
    padding: 0;
`;

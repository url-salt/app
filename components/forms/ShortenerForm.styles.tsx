import styled from "@emotion/styled";
import { Desktop } from "@styles/utils";

export const Root = styled.form`
    margin: 0;
    padding: 0;

    display: flex;

    ${Desktop} {
        width: 800px;
    }
`;

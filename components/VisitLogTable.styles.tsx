import styled from "@emotion/styled";
import { TableRow as MuiTableRow } from "@mui/material";

export const TableRow = styled(MuiTableRow)`
    &:last-child td,
    &:last-child th {
        border: 0;
    }
`;

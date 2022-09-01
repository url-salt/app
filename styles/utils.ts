import { Theme } from "@mui/material";

export const Mobile = ({ theme }: { theme: Theme }) => theme.breakpoints.down("md");
export const Desktop = ({ theme }: { theme: Theme }) => theme.breakpoints.up("md");

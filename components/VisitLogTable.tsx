import React from "react";
import { IntersectionObserverProps, InView } from "react-intersection-observer";
import { format } from "date-fns";

import {
    Box,
    CircularProgress,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    Typography,
    TableRow as MuiTableRow,
} from "@mui/material";

import { BorderlessRow, TableRow } from "@components/VisitLogTable.styles";

import { Nullable, VisitLog } from "@utils/types";

export interface VisitLogTableProps {
    minimumRows: number;
    loadMore(lastItem: Nullable<VisitLog>): Promise<VisitLog[]>;
}
export interface VisitLogTableStates {
    hasMore: boolean;
    items: VisitLog[] | null;
    loading: boolean;
}

export default class VisitLogTable extends React.Component<VisitLogTableProps, VisitLogTableStates> {
    public state: VisitLogTableStates = {
        hasMore: false,
        items: null,
        loading: true,
    };

    public async componentDidMount() {
        const { loadMore, minimumRows } = this.props;
        const initialItems = await loadMore(null);

        this.setState({
            hasMore: initialItems.length >= minimumRows,
            items: initialItems,
            loading: false,
        });
    }

    private handleInViewChange = async (inView: boolean) => {
        const { loadMore, minimumRows } = this.props;
        const { loading, hasMore, items } = this.state;
        if (loading || !hasMore || !inView || !items) {
            return;
        }

        const lastItem = items.at(-1);
        if (!lastItem) {
            return;
        }

        this.setState({ loading: true });

        const newItems = await loadMore(lastItem);

        this.setState(prevState => ({
            items: [...(prevState.items || []), ...newItems],
            hasMore: newItems.length >= minimumRows,
            loading: false,
        }));
    };

    private renderItem = (item: VisitLog) => {
        const country = item.country ? `${item.country} (${item.countryCode})` : "(none)";
        const browser = item.browser ? `${item.browser} ${item.browserVersion}` : "(none)";
        const os = item.os ? `${item.os} ${item.osVersion}` : "(none)";

        return (
            <TableRow key={item.id}>
                <TableCell width="18%">
                    <Typography fontSize="inherit">{format(item.createdAt, "yyyy-MM-dd hh:mm:ss")}</Typography>
                </TableCell>
                <TableCell width="18%" align="right">
                    {item.ip}
                </TableCell>
                <TableCell width="18%" align="right">
                    {country}
                </TableCell>
                <TableCell width="18%" align="right">
                    {browser}
                </TableCell>
                <TableCell width="18%" align="right">
                    {os}
                </TableCell>
                <TableCell width="10%" align="right">
                    {item.isBot ? "Yes" : "No"}
                </TableCell>
            </TableRow>
        );
    };
    private renderPlaceholder = (index: number, children: React.ReactNode = <Skeleton />, withoutBorder?: boolean) => {
        const RowComponent = withoutBorder ? BorderlessRow : TableRow;

        return (
            <RowComponent key={index}>
                <TableCell width="18%">{children}</TableCell>
                <TableCell width="18%" align="right">
                    {children}
                </TableCell>
                <TableCell width="18%" align="right">
                    {children}
                </TableCell>
                <TableCell width="18%" align="right">
                    {children}
                </TableCell>
                <TableCell width="18%" align="right">
                    {children}
                </TableCell>
                <TableCell width="10%" align="right">
                    {children}
                </TableCell>
            </RowComponent>
        );
    };
    private renderInView: IntersectionObserverProps["children"] = ({ ref }) => {
        return (
            <Box ref={ref} display="flex" alignItems="center" justifyContent="center">
                <CircularProgress size={24} />
            </Box>
        );
    };
    private renderLoader = () => {
        return (
            <TableRow key={-1}>
                <TableCell colSpan={6}>
                    <InView onChange={this.handleInViewChange}>{this.renderInView}</InView>
                </TableCell>
            </TableRow>
        );
    };
    public render() {
        const { minimumRows } = this.props;
        const { items, hasMore } = this.state;

        const children: React.ReactNode[] = [];
        if (!items) {
            for (let i = 0; i < minimumRows; ++i) {
                children.push(this.renderPlaceholder(i));
            }
        } else {
            children.push(...items.map(this.renderItem));

            const remainCount = minimumRows - children.length;
            for (let i = 0; i < remainCount; i++) {
                children.push(this.renderPlaceholder(i, <Box sx={{ userSelect: "none" }}>&nbsp;</Box>, true));
            }

            if (hasMore) {
                children.push(this.renderLoader());
            }
        }

        return (
            <TableContainer component={Box} borderRadius="4px" border="1px solid #ccc">
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <MuiTableRow>
                            <TableCell>Time</TableCell>
                            <TableCell align="right">IP</TableCell>
                            <TableCell align="right">Country</TableCell>
                            <TableCell align="right">Browser</TableCell>
                            <TableCell align="right">OS</TableCell>
                            <TableCell align="right">Is Bot?</TableCell>
                        </MuiTableRow>
                    </TableHead>
                    <TableBody>{children}</TableBody>
                </Table>
            </TableContainer>
        );
    }
}

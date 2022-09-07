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
    TableRow as MuiTableRow,
    Typography,
} from "@mui/material";

import { BorderlessRow, TableRow } from "@components/VisitLogTable.styles";

import { Nullable, VisitLog } from "@utils/types";

export interface VisitLogTableProps {
    minimumRows: number;
    loadMore(lastItem: Nullable<VisitLog>): Promise<VisitLog[]>;
    renderSubscription(newLogCallback: (log: VisitLog) => void): React.ReactNode;
}
export interface VisitLogTableStates {
    hasMore: boolean;
    items: VisitLog[] | null;
    loading: boolean;
    loaderInView: boolean;
}

export default class VisitLogTable extends React.Component<VisitLogTableProps, VisitLogTableStates> {
    private interval: NodeJS.Timeout | null = null;

    public state: VisitLogTableStates = {
        hasMore: false,
        items: null,
        loading: true,
        loaderInView: false,
    };

    public async componentDidMount() {
        const { loadMore, minimumRows } = this.props;
        const initialItems = await loadMore(null);

        this.setState({
            hasMore: initialItems.length >= minimumRows,
            items: initialItems,
            loading: false,
        });

        if (!this.interval) {
            this.interval = setInterval(() => {
                this.fetchNextItems();
            }, 1000);
        }
    }

    public fetchNextItems = async () => {
        const { loadMore, minimumRows } = this.props;
        const { loading, hasMore, items, loaderInView } = this.state;
        if (loading || !hasMore || !loaderInView || !items) {
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

    private handleInViewChange = async (inView: boolean) => {
        this.setState({ loaderInView: inView });
    };
    private handleSubscriptionData = (log: VisitLog) => {
        this.setState(prevState => ({
            items: [log, ...(prevState.items || [])],
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
    private renderEmpty = () => {
        return (
            <BorderlessRow key={-1}>
                <TableCell colSpan={6}>
                    <Typography color="#aaa" textAlign="center">
                        No one has visited this url yet
                    </Typography>
                </TableCell>
            </BorderlessRow>
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
        const { minimumRows, renderSubscription } = this.props;
        const { items, hasMore } = this.state;

        const children: React.ReactNode[] = [];
        if (!items) {
            for (let i = 0; i < minimumRows; ++i) {
                children.push(this.renderPlaceholder(i));
            }
        } else if (!items.length) {
            const halfCount = Math.floor(minimumRows / 2);
            for (let i = 0; i < halfCount; i++) {
                children.push(this.renderPlaceholder(i, <Box sx={{ userSelect: "none" }}>&nbsp;</Box>, true));
            }

            children.push(this.renderEmpty());

            for (let i = 0; i < halfCount; i++) {
                children.push(
                    this.renderPlaceholder(children.length + i, <Box sx={{ userSelect: "none" }}>&nbsp;</Box>, true),
                );
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
            <>
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
                {renderSubscription(this.handleSubscriptionData)}
            </>
        );
    }
}

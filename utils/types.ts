import type { ShortenUrlMutation, UrlQuery, VisitLogsQuery } from "queries/index";
import type { LayoutProps } from "@components/Layout";

export interface BasePageProps {
    __APOLLO_STATE__?: any;
    layoutProps?: Partial<Omit<LayoutProps, "children">>;
}

export interface SettingsValue {
    thumbnail: File | null;
    title: string;
    description: string;
}

export type ShortenedEntry = ShortenUrlMutation["shortenUrl"];
export type UrlEntry = Required<UrlQuery["url"]>;
export type VisitLog = Required<VisitLogsQuery["url"]>["visitLogs"][0];

export type Required<T> = Exclude<T, null | undefined>;
export type Nullable<T> = T | null | undefined;

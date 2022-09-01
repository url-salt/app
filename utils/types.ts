import type { HomePageContentQuery, ShortenUrlMutation } from "queries/index";

export interface BasePageProps {
    __APOLLO_STATE__?: any;
}

export type HomePageContent = HomePageContentQuery;
export type ShortenedEntry = ShortenUrlMutation["shortenUrl"];

export type Nullable<T> = T | null | undefined;

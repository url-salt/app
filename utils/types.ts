import type { HomePageContentQuery } from "queries/index";

export interface BasePageProps {
    __APOLLO_STATE__?: any;
}

export type HomePageContent = HomePageContentQuery;

export type Nullable<T> = T | null | undefined;

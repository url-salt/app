import type { HomePageContentQuery, ShortenUrlMutation } from "queries/index";

export interface BasePageProps {
    __APOLLO_STATE__?: any;
}

export interface SettingsValue {
    thumbnail: File | null;
    title: string;
    description: string;
}

export type HomePageContent = HomePageContentQuery;
export type ShortenedEntry = ShortenUrlMutation["shortenUrl"];

export type Nullable<T> = T | null | undefined;

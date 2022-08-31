import React from "react";
import { AppPropsType } from "next/dist/shared/lib/utils";
import { Router } from "next/dist/client/router";
import { BasePageProps } from "@utils/types";

declare module "next/app" {
    export declare type AppProps<P = {}> = Omit<AppPropsType<Router, BasePageProps>, "pageProps"> & {
        pageProps: BasePageProps;
    };
}

declare module "*.svg" {
    const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
    const content: string;

    export { ReactComponent };
    export default content;
}

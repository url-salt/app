import getConfig from "next/config";

interface Configuration {
    serverRuntimeConfig: {
        apiUrl?: {
            web: string;
            http: string;
            websocket: string;
        };
    };
}

export function getApiUrl() {
    const { serverRuntimeConfig }: Configuration = getConfig();

    return {
        web: process?.env?.SERV_WEB_URL || "blog.app.test",
        http:
            process?.env?.SERV_GRAPHQL_URI ||
            process?.env?.GRAPHQL_URI ||
            serverRuntimeConfig.apiUrl?.http ||
            "/graphql",
        websocket:
            process?.env?.SERV_WS_GRAPHQL_URI ||
            process?.env?.WS_GRAPHQL_URI ||
            serverRuntimeConfig.apiUrl?.websocket ||
            "/graphql",
    };
}

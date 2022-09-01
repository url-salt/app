import getConfig from "next/config";

interface Configuration {
    apiUrl?: {
        web: string;
        http: string;
        websocket: string;
    };
}

export function getApiUrl() {
    const {
        serverRuntimeConfig,
        publicRuntimeConfig,
    }: Record<"publicRuntimeConfig" | "serverRuntimeConfig", Configuration> = getConfig();

    return {
        web: process?.env?.SERV_WEB_URL || "blog.app.test",
        http:
            process?.env?.SERV_GRAPHQL_URI ||
            process?.env?.GRAPHQL_URI ||
            serverRuntimeConfig.apiUrl?.http ||
            publicRuntimeConfig.apiUrl?.http ||
            "/graphql",
        websocket:
            process?.env?.SERV_WS_GRAPHQL_URI ||
            process?.env?.WS_GRAPHQL_URI ||
            serverRuntimeConfig.apiUrl?.websocket ||
            publicRuntimeConfig.apiUrl?.websocket ||
            "/graphql",
    };
}

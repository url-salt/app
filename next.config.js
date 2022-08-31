/** @type {import('next').NextConfig} */
const nextConfig = {
    serverRuntimeConfig: {
        apiUrl: {
            http: process.env.SERV_GRAPHQL_URI || process.env.GRAPHQL_URI,
            websocket: process.env.SERV_WS_GRAPHQL_URI || process.env.WS_GRAPHQL_URI,
        },
    },
    publicRuntimeConfig: {
        apiUrl: {
            http: process.env.GRAPHQL_URI,
            websocket: process.env.WS_GRAPHQL_URI,
        },
    },

    reactStrictMode: true,
    swcMinify: true,

    compiler: {
        emotion: {
            autoLabel: "always",
            labelFormat: "[local]",
            sourceMap: true,
        },
    },

    output: "standalone",

    webpack(config) {
        const fileLoaderRule = config.module.rules.find(rule => rule.test && rule.test.test(".svg"));
        fileLoaderRule.exclude = /\.svg$/;
        config.module.rules.push({
            test: /\.svg$/,
            loader: require.resolve("@svgr/webpack"),
        });
        return config;
    },
};

module.exports = nextConfig;

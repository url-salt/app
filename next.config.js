const { withSentryConfig } = require("@sentry/nextjs");

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

// Make sure adding Sentry options is the last code to run before exporting, to
// ensure that your source maps include changes from all other Webpack plugins
module.exports = withSentryConfig(
    {
        ...nextConfig,

        sentry: {
            // Use `hidden-source-map` rather than `source-map` as the Webpack `devtool`
            // for client-side builds. (This will be the default starting in
            // `@sentry/nextjs` version 8.0.0.) See
            // https://webpack.js.org/configuration/devtool/ and
            // https://docs.sentry.io/platforms/javascript/guides/nextjs/manual-setup/#use-hidden-source-map
            // for more information.
            hideSourceMaps: true,
        },
    },
    {
        // Additional config options for the Sentry Webpack plugin. Keep in mind that
        // the following options are set automatically, and overriding them is not
        // recommended:
        //   release, url, org, project, authToken, configFile, stripPrefix,
        //   urlPrefix, include, ignore

        authToken: process.env.SENTRY_AUTH_TOKEN_VALUE,

        silent: false, // Suppresses all logs
        // For all available options, see:
        // https://github.com/getsentry/sentry-webpack-plugin#options.
    },
);

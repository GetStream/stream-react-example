'use strict';

/**
 * Config
 */
module.exports = {
    name: 'GetStream.io - React Example App',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'DEVELOPMENT',
    mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    },
    stream: {
        appId: process.env.STREAM_APP_ID,
        key: process.env.STREAM_KEY,
    },
    api: {
        baseUrl: process.env.API_URL,
    },
    imgix: {
        baseUrl: process.env.IMGIX_BASE_URL,
    },
    algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        searchOnlyKey: process.env.ALGOLIA_SEARCH_ONLY_KEY,
    },
    keen: {
        projectId: process.env.KEEN_PROJECT_ID,
        writeKey: process.env.KEEN_WRITE_KEY,
        readKey: process.env.KEEN_READ_KEY,
    }
};

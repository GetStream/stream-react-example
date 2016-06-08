'use strict';

/**
 * Config
 */
module.exports = {
    name: 'GetStream.io - React Example App',
    version: '1.0.0',
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 8000,
    jwt: {
        secret: process.env.JWT_SECRET,
    },
    db: {
         name: 'cabin',
         username: process.env.DB_USERNAME,
         password: process.env.DB_PASSWORD,
         host: process.env.DB_HOST,
         port: process.env.DB_PORT,
    },
    mapbox: {
        accessToken: process.env.MAPBOX_ACCESS_TOKEN,
    },
    s3: {
        key: process.env.S3_KEY,
        secret: process.env.S3_SECRET,
        bucket: process.env.S3_BUCKET,
    },
    stream: {
        appId: process.env.STREAM_APP_ID,
        key: process.env.STREAM_KEY,
        secret: process.env.STREAM_SECRET,
    },
    algolia: {
        appId: process.env.ALGOLIA_APP_ID,
        searchOnlyKey: process.env.ALGOLIA_SEARCH_ONLY_KEY,
        apiKey: process.env.ALGOLIA_API_KEY,
    },
    keen: {
        projectId: process.env.KEEN_PROJECT_ID,
        writeKey: process.env.KEEN_WRITE_KEY,
        readKey: process.env.KEEN_READ_KEY,
    },
};

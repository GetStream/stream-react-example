apps:
  - script: ./api/index.js
    name: api
    watch: true
    log_date_format: YYYY-MM-DD HH:mm Z
    env:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      DB_USERNAME: cabin
      DB_HOST: localhost
      DB_PASSWORD:
      DB_PORT: 3306
      MAPBOX_ACCESS_TOKEN: ${MAPBOX_ACCESS_TOKEN}
      S3_KEY: ${S3_KEY}
      S3_SECRET: ${S3_SECRET}
      S3_BUCKET: ${S3_BUCKET}
      STREAM_APP_ID: ${STREAM_APP_ID}
      STREAM_KEY: ${STREAM_KEY}
      STREAM_SECRET: ${STREAM_SECRET}
      ALGOLIA_APP_ID: ${ALGOLIA_APP_ID}
      ALGOLIA_SEARCH_ONLY_KEY: ${ALGOLIA_SEARCH_ONLY_KEY}
      ALGOLIA_API_KEY: ${ALGOLIA_API_KEY}
      KEEN_PROJECT_ID: ${KEEN_PROJECT_ID}
      KEEN_WRITE_KEY: ${KEEN_WRITE_KEY}
      KEEN_READ_KEY: ${KEEN_READ_KEY}
      IMGIX_BASE_URL: https://react-example-app.imgix.net/uploads
      API_URL: http://localhost:8000
  - script: ./app/bin/www
    name: app
    watch: true
    log_date_format: YYYY-MM-DD HH:mm Z
    env:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      DB_USERNAME: cabin
      DB_HOST: localhost
      DB_PASSWORD:
      DB_PORT: 3306
      MAPBOX_ACCESS_TOKEN: ${MAPBOX_ACCESS_TOKEN}
      S3_KEY: ${S3_KEY}
      S3_SECRET: ${S3_SECRET}
      S3_BUCKET: ${S3_BUCKET}
      STREAM_APP_ID: ${STREAM_APP_ID}
      STREAM_KEY: ${STREAM_KEY}
      STREAM_SECRET: ${STREAM_SECRET}
      ALGOLIA_APP_ID: ${ALGOLIA_APP_ID}
      ALGOLIA_SEARCH_ONLY_KEY: ${ALGOLIA_SEARCH_ONLY_KEY}
      ALGOLIA_API_KEY: ${ALGOLIA_API_KEY}
      KEEN_PROJECT_ID: ${KEEN_PROJECT_ID}
      KEEN_WRITE_KEY: ${KEEN_WRITE_KEY}
      KEEN_READ_KEY: ${KEEN_READ_KEY}
      IMGIX_BASE_URL: https://react-example-app.imgix.net/uploads
      API_URL: http://localhost:8000
  - script: ./www/bin/www
    name: www
    watch: true
    log_date_format: YYYY-MM-DD HH:mm Z
    env:
      NODE_ENV: production
      JWT_SECRET: ${JWT_SECRET}
      DB_USERNAME: cabin
      DB_HOST: localhost
      DB_PASSWORD:
      DB_PORT: 3306
      MAPBOX_ACCESS_TOKEN: ${MAPBOX_ACCESS_TOKEN}
      S3_KEY: ${S3_KEY}
      S3_SECRET: ${S3_SECRET}
      S3_BUCKET: ${S3_BUCKET}
      STREAM_APP_ID: ${STREAM_APP_ID}
      STREAM_KEY: ${STREAM_KEY}
      STREAM_SECRET: ${STREAM_SECRET}
      ALGOLIA_APP_ID: ${ALGOLIA_APP_ID}
      ALGOLIA_SEARCH_ONLY_KEY: ${ALGOLIA_SEARCH_ONLY_KEY}
      ALGOLIA_API_KEY: ${ALGOLIA_API_KEY}
      KEEN_PROJECT_ID: ${KEEN_PROJECT_ID}
      KEEN_WRITE_KEY: ${KEEN_WRITE_KEY}
      KEEN_READ_KEY: ${KEEN_READ_KEY}
      IMGIX_BASE_URL: https://react-example-app.imgix.net/uploads
      API_URL: http://localhost:8000
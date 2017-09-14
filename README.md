# 8 Step - React/Redux tutorial series

This example application created by [getstream.io](https://getstream.io/?ref=github_stream_react_example) teaches you how to to build an Instagram style application with activity streams and newsfeeds.

Visit [cabin.getstream.io](http://cabin.getstream.io/) for an overview of all 8 tutorials and a [live demo](http://cabin.getstream.io/demo). If you enjoy this tutorial please star this repo.

> Note: Cabin requires Node v8.x or above.

<p align="center">
  <img src="https://stream-cabin.s3.amazonaws.com/defaults/Cabin_Github@2x.png" alt="Examples of what you can build" title="What you can build"/>
</p>

## Blog Posts

1. [Introduction](https://getstream.io/blog/cabin-react-redux-example-app-introduction/)
2. [React & Redux](https://getstream.io/blog/cabin-react-redux-example-app-react/)
3. [Redux](https://getstream.io/blog/cabin-react-redux-example-app-redux/)
4. [Stream](https://getstream.io/blog/cabin-react-redux-example-app-stream/)
5. [Imgix](https://getstream.io/blog/cabin-react-redux-example-app-imgix/)
6. [Keen](https://getstream.io/blog/cabin-react-redux-example-app-keen/)
7. [Algolia](https://getstream.io/blog/cabin-react-redux-example-app-algolia/)


## Integrations

* [Keen](https://keen.io/)
* [ImgIX](http://imgix.com/)
* [Algolia](https://www.algolia.com/)
* [Mapbox](https://www.mapbox.com/)
* [Digital Ocean](https://www.digitalocean.com/)
* [Stream](https://getstream.io)

## Quick start

This quick start is a minimal set of instructions for experienced developers
and folks who have already setup their development environment in the past.

For beginners and those new to the project, we strongly recommend starting with
the  introductory [Cabin – React & Redux Example App – Introduction](https://getstream.io/blog/cabin-react-redux-example-app-introduction/) blog post.

Note: Paths below are relative to the root project directory.

### 0. Setup
1. Install the API package dependencies:
    ``` bash
    cd ./api && npm install
    ```

2. Install the App package dependencies:
    ``` bash
    cd ./app && npm install
    ```

3. Install a database server (if necessary) and create a database.
4. Set local environment configuration in the `.env` environment.

### 1. Run the API
1. Start your database server
2. Run the following shell command:
    ``` bash
    cd ./api
    source ../env.sh; node index.js
    ```

### 2. Run the App
1. Run the following shell command:
    ``` bash
    cd ./app
    source ../env.sh; webpack --watch --progress
    ```

### 3. Run the Website
1. Run the following shell command:
    ``` bash
    npm start
    ```

### 4. Win.
1. Browse to `http://localhost:3000`.

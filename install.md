## Requirements (an understanding of the following)
1. [Node.js](https://nodejs.org/)
2. [React.js](https://facebook.github.io/react/)
3. [Redux.js](http://redux.js.org/)
4. [Webpack](https://webpack.github.io/)

## Installation
1. Clone repository
2. Setup MySQL database with your username and password (database schema for import located in `/db`)
3. Update `env.sh` in `/` with proper credentials
4. In a terminal window, cd into the directory for `app` and run `npm install` then `npm start`
5. In a terminal window, cd into the directory for `api` and run `npm install` then `node index.js`
6. Go to `http://localhost:3000/`

## Development
1. In a terminal window, cd into the directory for `app` and run `npm install` then `webpack --watch --progress`

Note:
> The app runs on port `3000` and the api runs on port `8000`

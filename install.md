## Requirements (an understanding of the following)
1. [Node.js](https://nodejs.org/)
2. [React.js](https://facebook.github.io/react/)
3. [Redux.js](http://redux.js.org/)
4. [Webpack](https://webpack.github.io/)

## Installation / Development
1. Clone repository via `git clone git@github.com:GetStream/stream-react-example.git`
2. Setup MySQL database with your username and password (database schema for import located in `/db`)
3. Update `env.sh` in `/` with proper credentials and source the `env.sh` file via `source env.sh`
4. Run webpack to pickup on changes in `/app` by running `webpack --watch --progress`
5. In a terminal window, cd into the directory for `app` and run `npm install` then `npm start`
6. In a terminal window, cd into the directory for `api` and run `npm install` then `node index.js`
7. Go to `http://localhost:3000/`

Note:
> The app runs on port `3000` and the api runs on port `8000`

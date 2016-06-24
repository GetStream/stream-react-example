## Requirements (an understanding of the following)
1. [Node.js](https://nodejs.org/)
2. [React.js](https://facebook.github.io/react/)
3. [Redux.js](http://redux.js.org/)
4. [Webpack](https://webpack.github.io/)

## Installation / Development
1. Clone repository via `git clone git@github.com:GetStream/stream-react-example.git`
2. In a terminal window, cd into the directory for `/app` and run `npm install`
3. In a terminal window, cd into the directory for `/api` and run `npm install`
4. Run `npm install -g webpack nodemon`
5. Update `env.sh` in `/` with proper credentials and source the `env.sh` file via `source env.sh`
6. Run webpack to pickup on changes in `/app` by running `source ../env.sh; webpack --watch --progress`
7. In a terminal window, cd into the directory for `/app` then `source ../env.sh; npm start`
8. In a terminal window, cd into the directory for `/api` then `source ../env.sh; nodemon` or `source ../env.sh; node index.js`
9. Setup MySQL database with your username and password (database schema for import is located in `/db`)

Voila:
Go to `http://localhost:3000/`

Note:
> The app runs on port `3000` and the api runs on port `8000`

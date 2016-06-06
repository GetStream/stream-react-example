import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer } from 'react-router-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import config from 'config'

/**
 * window.keenClient
 * Instantiate new Keen client
 * @type {Keen}
 */
window.keenClient = new Keen({
    projectId: config.keen.projectId,
    writeKey: config.keen.writeKey,
    readKey: config.keen.readKey
});

require('./style.css')

/**
 * rootRoute
 * @type {{path: string, getComponent: (function(*, *)), getChildRoutes: (function(*, *))}}
 */
const rootRoute = {
    path: '/',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./App').default)
    },

    /**
     * getChildRoutes
     * @param location
     * @param cb {Function} callback
     */
    getChildRoutes(location, cb) {
        cb(null, [
            require('./routes/Landing'),
            require('./routes/Home'),
            require('./routes/Upload'),
            require('./routes/Search'),
            require('./routes/SearchResults'),
            require('./routes/Notifications'),
            require('./routes/Explore'),
            require('./routes/Trending'),
            require('./routes/Profile'),
            require('./routes/FollowingActivity'),
            require('./routes/Stats'),
            require('./routes/Contributions'),
            require('./routes/Location'),
        ])
    },

}

/**
 * appElm
 * @type {Nullable.<Element>|Element}
 */
const appElm = document.getElementById('app')

import * as reducers from './reducers'

/**
 * store
 */
export const store = createStore(
    combineReducers({
        ...reducers,

        routing: routerReducer
    }),
    applyMiddleware(thunk),
)

/**
 * history
 */
const history = syncHistoryWithStore(browserHistory, store)

/**
 * render Provider
 */
render((
  <Provider store={store}>
      <Router
          history={history}
          onUpdate={() => appElm.scrollIntoView()}
          routes={rootRoute} />
  </Provider>
), appElm)

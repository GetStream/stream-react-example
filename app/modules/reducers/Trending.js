import {
    Trending as TrendingActions
} from 'actions'

/**
 * Trending
 * Redux Reducer for Trending action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Trending(state = [], action) {

    switch (action.type) {
        case TrendingActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return []
    }

    return state
}

export default Trending

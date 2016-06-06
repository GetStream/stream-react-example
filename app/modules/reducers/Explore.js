import {
    Explore as ExploreActions
} from 'actions'

/**
 * Explore
 * Redux Reducer for Explore action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Explore(state = [], action) {

    switch (action.type) {
        case ExploreActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return []
    }

    return state
}

export default Explore

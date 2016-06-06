import {
    Location as LocationActions
} from 'actions'

/**
 * Location
 * Redux Reducer for Location action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Location(state = [], action) {

    switch (action.type) {
        case LocationActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return []
    }

    return state
}

export default Location

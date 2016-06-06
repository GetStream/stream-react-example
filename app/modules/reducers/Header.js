import {
    Header as HeaderActions,
} from 'actions'

/**
 * initialState
 * @type {{left: null, middle: null, right: null}}
 */
const initialState = {
    left: null,
    middle: null,
    right: null,
}

/**
 * Header
 * Redux Reducer for Header action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Header(state = initialState, action) {

    switch (action.type) {

        case HeaderActions.LEFT:
            return Object.assign({}, state, {
                left: action.component,
            })

        case HeaderActions.MIDDLE:
            return Object.assign({}, state, {
                middle: action.component,
            })

        case HeaderActions.RIGHT:
            return Object.assign({}, state, {
                right: action.component,
            })
    }

    return state
}

export default Header

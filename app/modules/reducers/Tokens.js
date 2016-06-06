import {
    User as UserActions,
} from 'actions'

/**
 * initialState
 * @type {{notification: string, timelineAgg: string, timelineFlat: string}}
 */
const initialState = {
    notification: '',
    timelineAgg: '',
    timelineFlat: '',
}

/**
 * Tokens
 * Redux Reducer for Tokens action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Tokens(state = initialState, action) {
    switch (action.type) {

        case UserActions.FB_LOGIN:
            if (action.initial) {
                let newState = {
                    notification: action.initial.tokens.notification,
                    timelineAgg: action.initial.tokens.timeline.aggregated,
                    timelineFlat: action.initial.tokens.timeline.flat,
                }
                return Object.assign({}, state, newState)
            }
            return state
    }

    return state
}

export default Tokens

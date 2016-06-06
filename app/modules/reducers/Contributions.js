import {
    Contributions as ContributionActions
} from 'actions'

/**
 * Contributions
 * Redux Reducer for Contributions action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Contributions(state = [], action) {

    switch (action.type) {
        case ContributionActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return []
    }

    return state
}

export default Contributions

import {
    Photos as PhotoActions,
} from 'actions'

/**
 * initialState
 * @type {{lastId: null, fetching: boolean}}
 */
const initialState = {
    lastId: null,
    fetching: false,
}

/**
 * Pagination
 * Redux Reducer for Pagination action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Pagination(state = initialState, action) {

    switch (action.type) {

        case PhotoActions.LOAD:
        case PhotoActions.PAGINATE:
            if (action.response) {
                const lastItem = action.response.slice(-1)
                const obj = Object.assign({}, state, {
                    fetching: false,
                })
                if (lastItem[0] && lastItem[0].id) {
                    Object.assign(obj, { lastId: lastItem[0].id, })
                }
                return obj
            }
            return Object.assign({}, state, { fetching: true, })
    }

    return state
}

export default Pagination

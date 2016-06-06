import {
    User as UserActions,
} from 'actions'

/**
 * initialState
 * @type {{id: string, fb_uid: string, first_name: string, last_name: string, email: string}}
 */
const initialState = {
    id: '',
    fb_uid: '',
    first_name: '',
    last_name: '',
    email_md5: '',
}

/**
 * User
 * Redux Reducer for User action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function User(state = initialState, action) {

    switch (action.type) {
        case UserActions.LOGIN:
            return Object.assign({}, state, action.response)

        case UserActions.FB_LOGIN:
            if (action.initial) {
                return Object.assign({}, state, {
                    id         : action.initial.id,
                    fb_uid     : action.initial.fb_uid,
                    first_name : action.initial.first_name,
                    last_name  : action.initial.last_name,
                    email_md5  : action.initial.email_md5,
                })
            }
            return state

        case UserActions.LOGOUT:
            return Object.assign({}, state, initialState)

    }

    return state
}

export default User

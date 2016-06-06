import { camelizeKeys, } from 'humps'

import {
    Comments as CommentActions,
} from 'actions'

/**
 * initialState
 * @type {{comments: Array, uploadID: null}}
 */
const initialState = {
    comments: [],
    uploadID: null,
}

/**
 * Redux Reducer for Comments action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Comments(state = initialState, action) {
    switch (action.type) {

        case CommentActions.LOAD_COMMENTS:
            if (action.comments) {
                return Object.assign({}, state, {
                    comments: [...action.comments.map(c => camelizeKeys(c))],
                    uploadID: action.postID,
                })
            }

            return initialState

        case CommentActions.ADD_COMMENT:
            if (action.comment) {
                const user = camelizeKeys(action.user)
                return Object.assign({}, state, {
                    comments: [
                        Object.assign({}, camelizeKeys(action.comment), {
                            firstName: user.firstName,
                            lastName: user.lastName,
                            createdAt: new Date(),
                        }),
                        ...state.comments,
                    ]
                })

            }
        return state
    }

    return state
}

export default Comments

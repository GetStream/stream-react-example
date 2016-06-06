import {
    Like as LikeActions,
} from 'actions'

/**
 *
 * @type {{likes: number, liked: boolean}}
 */
const initialState = {
    likes: 0,
    liked: false,
}

/**
 * Likes
 * Redux Reducer for Likes action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Likes(state = initialState, action) {

    switch (action.type) {

        case LikeActions.LOAD:
            if (action.response) {
                return Object.assign({}, state, {
                    likes: action.response.likes,
                    liked: action.response.liked,
                })
            }

            return initialState

        case LikeActions.ADD_LIKE:
            if (action.response) {
                return Object.assign({}, state, { liked: true, likes: action.response.likes })
            }
            break

        case LikeActions.DELETE_LIKE:
            if (action.response) {
                return Object.assign({}, state, { liked: false, likes: action.response.likes })
            }
            break

    }

    return state

}

export default Likes

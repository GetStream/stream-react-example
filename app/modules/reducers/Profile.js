import {
    Profile as ProfileActions,
} from 'actions'

/**
 * initialState
 * @type {{id: string, fb_uid: string, first_name: string, last_name: string, email: string, follower: boolean, following: boolean, follower_count: number, following_count: number, created_at: string, modified_at: string}}
 */
const initialState = {
    id: '',
    fb_uid: '',
    first_name: '',
    last_name: '',
    email_md5: '',
    follower: false,
    following: false,
    follower_count: 0,
    following_count: 0,
    created_at: '',
    modified_at: '',
}

/**
 * Profile
 * Redux Reducer for Profile action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Profile(state = initialState, action) {

    switch (action.type) {

        case ProfileActions.LOAD:
            if (action.response) {
                return Object.assign({}, state, {
                    id: action.response.id,
                    fb_uid: action.response.fb_id,
                    first_name: action.response.first_name,
                    last_name: action.response.last_name,
                    email_md5: action.response.email_md5,
                    follower: action.response.follower,
                    following: action.response.following,
                    follower_count: action.response.follower_count,
                    following_count: action.response.following_count,
                    created_at: action.response.created_at,
                    modified_at: action.response.modified_at,
                })
            }

            return initialState

        case ProfileActions.FOLLOW:
            if (action.response) {
                return Object.assign({}, state, {
                    following: true,
                    follower_count: state.follower_count + 1,
                })
            }

            return state

        case ProfileActions.UNFOLLOW:
            if (typeof action.response != 'undefined') {
                return Object.assign({}, state, {
                    following: false,
                    follower_count: state.follower_count - 1,
                })
            }

    }

    return state

}

export default Profile

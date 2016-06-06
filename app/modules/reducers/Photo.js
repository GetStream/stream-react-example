import {
    Photo as PhotoActions,
} from 'actions'

/**
 * initialState
 * @type {{id: string, caption: string, created_at: string, email: string, fb_uid: string, filename: string, first_name: string, hashtags: string, last_name: string, latitude: string, liked: string, location: string, longitude: string, modified_at: string, user_id: string, loading: boolean}}
 */
const initialState = {
    id: '',
    caption: '',
    created_at: '',
    email_md5: '',
    fb_uid: '',
    filename: '',
    first_name: '',
    hashtags: '',
    last_name: '',
    latitude: '',
    liked: '',
    location: '',
    longitude: '',
    modified_at: '',
    user_id: '',

    loading: false,
}

/**
 * Photo
 * Redux Reducer for Photo action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Photo(state = initialState, action) {

    switch (action.type) {
        case PhotoActions.LOAD:
            if (action.response) {
                const res = action.response
                return Object.assign({}, state, {
                    id: res.id,
                    caption: res.caption,
                    created_at: res.created_at,
                    email: res.email,
                    email_md5: res.email_md5,
                    fb_uid: res.fb_uid,
                    filename: res.filename,
                    first_name: res.first_name,
                    hashtags: res.hashtags,
                    last_name: res.last_name,
                    latitude: res.latitude,
                    liked: res.liked,
                    location: res.location,
                    longitude: res.longitude,
                    modified_at: res.modified_at,
                    user_id: res.user_id,

                    loading: false,
                })
            }

            return Object.assign({}, state, { loading: true })
    }

    return state
}

export default Photo

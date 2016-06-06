import * as axios from 'axios'
import config from 'config'

/**
 * ADD_COMMENT
 * @type {string}
 */
export const ADD_COMMENT = 'PHOTOS_ADD_COMMENT'

/**
 * _addCommentRequest
 * @param id
 * @private
 */
export const _addCommentRequest = (id) => ({ type: ADD_COMMENT, id, })

/**
 * _addCommentResponse
 * @param id
 * @param comment
 * @param user
 * @private
 */
export const _addCommentResponse = (id, comment, user) => ({ type: ADD_COMMENT, id, comment, user, })

/**
 * addComment
 * Posts comment data to API
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param id
 * @param text
 * @returns {Function}
 */
export function addComment(id, text) {
    return (dispatch, getState) => {
        const user = getState().User
        dispatch(_addCommentRequest(id))
        const data = {
            user_id: user.id,
            upload_id: id,
            comment: text,
        }
        axios.post(`${config.api.baseUrl}/comments`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_addCommentResponse(id, res.data, user))
        })
    }
}

/**
 * LOAD_COMMENTS
 * @type {string}
 */
export const LOAD_COMMENTS = 'PHOTOS_LOAD_COMMENT'

/**
 * _loadCommentsRequest
 * @param postID
 * @private
 */
export const _loadCommentsRequest = (postID) => ({ type: LOAD_COMMENTS, postID, })

/**
 * _loadCommentsResponse
 * @param postID
 * @param comments
 * @private
 */
export const _loadCommentsResponse = (postID, comments) => ({ type: LOAD_COMMENTS, postID, comments, })

/**
 * load
 * Gets comments from API based on upload id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param postID
 * @returns {Function}
 */
export function load(postID) {
    return dispatch => {
        dispatch(_loadCommentsRequest(postID))
        axios.get(`${config.api.baseUrl}/comments?upload_id=${postID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadCommentsResponse(postID, res.data))
        })
    }
}

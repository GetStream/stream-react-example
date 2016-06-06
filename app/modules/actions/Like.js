import * as axios from 'axios'
import config from 'config'
import * as querystring from 'querystring'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'LIKE_LOAD'

/**
 * _loadRequest
 * @param postID
 * @private
 */
export const _loadRequest = (postID) => ({ type: LOAD, postID, })

/**
 * _loadResponse
 * @param postID
 * @param response
 * @private
 */
export const _loadResponse = (postID, response) => ({ type: LOAD, postID, response, })

/**
 * load
 * Gets number of 'likes' from API for user and post
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param postID post id
 * @param userID user id
 * @returns {Function}
 */
export function load(postID, userID) {
    return (dispatch, getState) => {
        dispatch(_loadRequest(postID))
        const user = getState().User
        axios.get(`${config.api.baseUrl}/likes?upload_id=${postID}&user_id=${user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadResponse(postID, res.data))
        })
    }
}

/**
 * ADD_LIKE
 * @type {string}
 */
export const ADD_LIKE = 'ADD_LIKE'

/**
 * _hnadleAddLikeRequest
 * @param postID
 * @private
 */
export const _handleAddLikeRequest = (postID) => ({ type: ADD_LIKE, postID,})

/**
 * _handleAddLikeResponse
 * @param postID
 * @param response
 * @private
 */
export const _handleAddLikeResponse = (postID, response) => ({ type: ADD_LIKE, postID, response, })

/**
 * like
 * Posts a 'like' to the API for a user and post
 * @param postID post id
 * @returns {Function}
 */
export function like(postID) {
    return (dispatch, getState) => {
        dispatch(_handleAddLikeRequest(postID))
        const data = {
            user_id: getState().User.id,
            upload_id: postID,
        }
        axios.post(`${config.api.baseUrl}/likes`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_handleAddLikeResponse(postID, res.data))
        })
    }
}

/**
 * DELETE_LIKE
 * @type {string}
 */
export const DELETE_LIKE = 'DELETE_LIKE'

/**
 * _handleDeleteLikeRequest
 * @param postID
 * @private
 */
export const _handleDeleteLikeRequest = (postID) => ({ type: DELETE_LIKE, postID,})

/**
 * _handleDeleteLikeResponse
 * @param postID
 * @param response
 * @private
 */
export const _handleDeleteLikeResponse = (postID, response) => ({ type: DELETE_LIKE, postID, response, })

/**
 * deleteLike
 * Removes like (unlikes) for a user and a post
 * @param postID post id
 * @returns {Function}
 */
export function deleteLike(postID) {
    return (dispatch, getState) => {
        dispatch(_handleDeleteLikeRequest(postID))
        const data = {
            user_id: getState().User.id,
            upload_id: postID,
        }
        axios.delete(`${config.api.baseUrl}/likes?` + querystring.stringify(data), {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        .then(res => {
            dispatch(_handleDeleteLikeResponse(postID, res.data))
        })
    }
}

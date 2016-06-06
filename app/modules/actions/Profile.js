import * as axios from 'axios'
import config from 'config'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'PROFILE_LOAD'

/**
 * _loadRequest
 * @param userID
 * @private
 */
export const _loadRequest = (userID) => ({ type: LOAD, userID, })

/**
 * _loadResponse
 * @param userID
 * @param response
 * @private
 */
export const _loadResponse = (userID, response) => ({ type: LOAD, userID, response, })

/**
 * load
 * Gets profile data from the API for a given user id
 * @param userID user id
 * @returns {Function}
 */
export function load(userID) {
    return (dispatch, getState) => {
        dispatch(_loadRequest(userID))
        const user = getState().User
        axios.get(`${config.api.baseUrl}/users/${userID}?user_id=${user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadResponse(userID, res.data))
        })
    }
}

/**
 * FOLLOW
 * @type {string}
 */
export const FOLLOW = 'PROFILE_FOLLOW'

/**
 * _followRequest
 * @param userID
 * @private
 */
export const _followRequest = (userID) => ({ type: FOLLOW, userID, })

/**
 * _followResponse
 * @param userID
 * @param response
 * @private
 */
export const _followResponse = (userID, response) => ({ type: FOLLOW, userID, response, })

/**
 * follow
 * Posts a 'follow' action to the API for a given user id
 * @param userID user id
 * @returns {Function}
 */
export function follow(userID) {
    return (dispatch, getState) => {
        return new Promise(resolve => {

            dispatch(_followRequest(userID))
            const user = getState().User
            const data = {
                user_id: user.id,
                follower_id: userID,
            }
            axios.post(`${config.api.baseUrl}/followers`, data, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })
            .then(res => {
                dispatch(_followResponse(userID, res.data))

                resolve()
            })

        })
    }
}

/**
 * UNFOLLOW
 * @type {string}
 */
export const UNFOLLOW = 'PROFILE_UNFOLLOW'

/**
 * _unfollowRequest
 * @param userID
 * @private
 */
export const _unfollowRequest = (userID) => ({ type: UNFOLLOW, userID, })

/**
 * _unfollowResponse
 * @param userID
 * @param response
 * @private
 */
export const _unfollowResponse = (userID, response) => ({ type: UNFOLLOW, userID, response, })

/**
 * unfollow
 * Posts an 'unfollow' action to the API for a given user id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param userID follower id
 * @returns {Function}
 */
export function unfollow(userID) {
    return (dispatch, getState) => {
        return new Promise(resolve => {
            dispatch(_unfollowRequest(userID))
            const user = getState().User
            axios.delete(`${config.api.baseUrl}/followers?user_id=${user.id}&follower_id=${userID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                }
            })
            .then(res => {
                dispatch(_unfollowResponse(userID, res.data))
                resolve()
            })
        })
    }
}

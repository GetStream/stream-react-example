import * as axios from 'axios'
import config from 'config'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'CONTRIBUTIONS_LOAD'

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
 * Get contributions from API by user id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param userID user id
 * @returns {Function}
 */
export function load(userID) {
    return (dispatch, getState) => {
        dispatch(_loadRequest(userID))
        const user = getState().User
        axios.get(`${config.api.baseUrl}/contributions?user_id=${userID || user.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadResponse(userID, res.data))
        })
    }
}

import * as axios from 'axios'
import config from 'config'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'INCOMING_ACTIVITY_LOAD'

/**
 * _loadRequest
 * @private
 */
export const _loadRequest = () => ({ type: LOAD, })

/**
 * _loadResponse
 * @param response
 * @private
 */
export const _loadResponse = (response) => ({ type: LOAD, response, })


/**
 * load
 * Get notifications from API for user
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function load() {
    return (dispatch, getState) => {
        return new Promise((resolve => {
            dispatch(_loadRequest())
            axios.get(`${config.api.baseUrl}/incoming-activity?user_id=${getState().User.id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })
            .then(res => {
                dispatch(_loadResponse(res.data))
                resolve()
            })
        }))
    }
}

import * as axios from 'axios'
import config from 'config'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'LOCATION_LOAD'

/**
 * _loadRequest
 * @param location
 * @private
 */
export const _loadRequest = (location) => ({ type: LOAD, location, })

/**
 * _loadResponse
 * @param location
 * @param response
 * @private
 */
export const _loadResponse = (location, response) => ({ type: LOAD, location, response, })

/**
 * load
 * Gets data from API for a given location
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param location
 * @returns {Function}
 */
export function load(location) {
    return (dispatch) => {
        dispatch(_loadRequest(location))
        axios.get(`${config.api.baseUrl}/locations?q=${location}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadResponse(location, res.data))
        })
    }
}

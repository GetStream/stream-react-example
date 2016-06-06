import * as axios from 'axios'
import config from 'config'

import {
    Like as LikeActions,
    Comments as CommentActions,
} from 'actions'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'PHOTO_LOAD'

/**
 * _loadRequest
 * @private
 */
const _loadRequest = () => ({ type: LOAD, })

/**
 * _loadResponse
 * @param response
 * @private
 */
const _loadResponse = (response) => ({ type: LOAD, response, })

/**
 * load
 * Gets single photo upload from API based on upload id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param id upload id
 * @returns {Function}
 */
export function load(id) {
    return dispatch => {
        return new Promise((resolve) => {
            dispatch(_loadRequest())
            axios.get(`${config.api.baseUrl}/upload?id=${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })
            .then(res => {
                dispatch(_loadResponse(res.data))
                dispatch(CommentActions.load(id))
                dispatch(LikeActions.load(id))
                return resolve()
            })
        })
    }
}

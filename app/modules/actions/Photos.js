import * as axios from 'axios'
import config from 'config'

export const INJECT = 'PHOTOS_INJECT'
export function inject(posts) {
    return {
        type: INJECT,
        posts,
    }
}

/**
 * ADD
 * @type {string}
 */
export const ADD = 'PHOTO_ADD'

/**
 * add
 * @param response
 * @returns {{type: string, response: *}}
 */
export function add(response) {
    return {
        type: ADD,
        response,
    }
}

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'PHOTOS_LOAD'

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

export const ONBOARDING = 'PHOTOS_ONBOARDING'
const _loadOnboarding = (response) => ({ type: ONBOARDING, response, })

/**
 * load
 * Get photo uploads from the API based on user id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param id user id
 * @returns {Function}
 */
export function load(id) {
    return (dispatch, getState) => {
      const userID = id || getState().User.id
        dispatch(_loadRequest())

        Promise.all([
            axios.get(`${config.api.baseUrl}/uploads?user_id=${userID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            }),
            axios.get(`${config.api.baseUrl}/active?user_id=${userID}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`,
                },
            })
        ])
        .then(res => {
            dispatch(_loadResponse(res[0].data))
            dispatch(_loadOnboarding(res[1].data))
        })
    }
}

export const RELOAD = 'PHOTOS_RELOAD'
const _reloadResponse = response => ({ type: RELOAD, response, })

export function reload() {
    return (dispatch, getState) => {
        const userID = getState().User.id

        axios.get(`${config.api.baseUrl}/uploads?user_id=${userID}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(res => {
            dispatch(_reloadResponse(res.data))
            Promise.resolve()
        })
    }
}

/**
 * LIKE
 * @type {string}
 */
export const LIKE = 'PHOTOS_LIKE'

/**
 * _likeRequest
 * @private
 */
const _likeRequest = () => ({ type: LIKE, })

/**
 * _likeResponse
 * @param postID
 * @param response
 * @private
 */
const _likeResponse = (postID, response) => ({ type: LIKE, postID, response, })

/**
 * like
 * Post a 'like' to the API for a given post
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param postID post id
 * @returns {Function}
 */
export function like(postID) {
    return (dispatch, getState) => {
        dispatch(_likeRequest())
        const data = {
            user_id: getState().User.id,
            upload_id: postID,
        }
        axios.post(`${config.api.baseUrl}/likes`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`,
            },
        })
        .then(res => {
            dispatch(_likeResponse(postID, res.data))
        })
    }
}

/**
 * UNLIKE
 * @type {string}
 */
export const UNLIKE = 'PHOTOS_UNLIKE'

/**
 * _unlikeRequest
 * @private
 */
const _unlikeRequest = () => ({ type: UNLIKE, })

/**
 * _unlikeRequestResponse
 * @param postID
 * @param response
 * @private
 */
const _unlikeRequestResponse = (postID, response) => ({ type: UNLIKE, postID, response, })

/**
 * unlike
 * Post an 'unlike' to the API based on post id
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param postID post id
 * @returns {Function}
 */
export function unlike(postID) {
    return (dispatch, getState) => {
        return new Promise(resolve => {
            dispatch(_unlikeRequest())
            const data = {
                user_id: getState().User.id,
                upload_id: postID,
            }
            axios.delete(`${config.api.baseUrl}/likes?user_id=${data.user_id}&upload_id=${data.upload_id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('jwt')}`
                },
            })
            .then(res => {
                dispatch(_unlikeRequestResponse(postID, res.data))
                resolve()
            })
        })
    }
}

/**
 * PAGINATE
 * @type {string}
 */
export const PAGINATE = 'PHOTOS_PAGINATE'

/**
 * _paginateRequest
 * @param lastId
 * @private
 */
const _paginateRequest = lastId => ({ type: PAGINATE, lastId, })

/**
 * _paginateResponse
 * @param response
 * @private
 */
const _paginateResponse = response => ({ type: PAGINATE, response, })

/**
 * paginate
 * Get photo uploads from API based on user id, and the last post id (for pagination purposes)
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function paginate() {
    return (dispatch, getState) => {
        const {
            Pagination,
            User,
        } = getState()
        if (Pagination.fetching) return;
        dispatch(_paginateRequest(Pagination.lastId))
        axios.get(`${config.api.baseUrl}/uploads?user_id=${User.id}&last_id=${Pagination.lastId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_paginateResponse(res.data))
        })
    }
}

export const LOAD_HIDDEN = 'PHOTOS_LOAD_HIDDEN'
export const loadHidden = () => ({ type: LOAD_HIDDEN, })

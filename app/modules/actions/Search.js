import * as axios from 'axios'
import algoliasearch from 'algoliasearch'
import config from 'config'

const algolia = algoliasearch(config.algolia.appId, config.algolia.searchOnlyKey)


/**
 * SEARCH
 * @type {string}
 */
export const SEARCH = 'SEARCH_SEARCH'

/**
 * _searchRequest
 * @param term
 * @private
 */
const _searchRequest = (term) => ({ type: SEARCH, term, })

/**
 * _searchResponse
 * @param term
 * @param response
 * @private
 */
const _searchResponse = (term, response) => ({ type: SEARCH, term, response, })

/**
 * search
 * Make a search request to algolia based on term (string) and type
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param term {string} search term
 * @param type {string} type of search ('all', 'hashtags', 'location')
 * @returns {Function}
 */
export function search(term, type = 'all') {

    return dispatch => {

        // Initialize the 'cabin' index:
        let index = algolia.initIndex('cabin'),
            attrs = []

        switch(type) {
            case 'all':
                attrs.push(
                    'first_name',
                    'last_name',
                    'location',
                    'hashtags',
                )
                break;
            case 'hashtags':
                attrs.push('hashtags')
                break
            case 'user':
                attrs.push(
                    'first_name',
                    'last_name',
                )
                break
            case 'location':
                attrs.push('location')
                break
        }

        // Perform Algolia search:
        index.search(term, {
            attributesToHighlight: attrs,
            hitsPerPage: 100
        }, (err, content) => {
            dispatch(_searchResponse(term, content))
        })
    }
    
}

/**
 * TRIGGER
 * @type {string}
 */
export const TRIGGER = 'SEARCH_TRIGGER'

/**
 * _triggerRequest
 * @param search
 * @private
 */
const _triggerRequest = (search) => ({ type: TRIGGER, search, })

/**
 * _triggerResponse
 * @param search
 * @param response
 * @private
 */
const _triggerResponse = (search, response) => ({ type: TRIGGER, search, response, })

/**
 * trigger
 * Triggers search, and posts search data to API
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param search
 * @returns {Function}
 */
export function trigger(search) {
    return (dispatch, getState) => {
        dispatch(_triggerRequest(search))
      /**
       * data
       * @type {{user_id: *, search: *}}
       */
        const data = {
            user_id: getState().User.id,
            search: search.word,
        }
        axios.post(`${config.api.baseUrl}/searches`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_triggerResponse(search, res.data))
        })
    }
}

/**
 * RECENT
 * @type {string}
 */
export const RECENT = 'SEARCH_RECENT'

/**
 * _recentRequest
 * @private
 */
const _recentRequest = () => ({ type: RECENT, })

/**
 * _recentResponse
 * @param response
 * @private
 */
const _recentResponse = (response) => ({ type: RECENT, response, })

/**
 * recent
 * Gets recent searches from API for a given user
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @returns {Function}
 */
export function recent() {
    return (dispatch, getState) => {
        dispatch(_recentRequest())
        axios.get(`${config.api.baseUrl}/searches?user_id=${getState().User.id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_recentResponse(res.data))
        })
    }
}

/**
 * RESULTS
 * @type {string}
 */
export const RESULTS = 'SEARCH_RESULTS'

/**
 * _searchResultsRequest
 * @private
 */
const _searchResultsRequest = () => ({ type: RESULTS, })

/**
 * _searchResultsResponse
 * @param response
 * @private
 */
const _searchResultsResponse = (response) => ({ type: RESULTS, response, })

/**
 * results
 * Gets uploads from API based on Algolia Search response
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param type {string}
 * @param query {string}
 * @returns {Function}
 */
export function results(type, query) {
    return dispatch => {
        dispatch(_searchResultsRequest())
        axios.get(`${config.api.baseUrl}/uploads?type=${type}&query=${encodeURIComponent(query)}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_searchResultsResponse(res.data))
        })
    }
}

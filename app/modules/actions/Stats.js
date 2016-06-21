import config from 'config'
import * as axios from 'axios'

/**
 * LOAD
 * @type {string}
 */
export const LOAD = 'STATS_LOAD'

/**
 * _loadRequest
 * @param userId
 * @private
 */
export const _loadRequest = (userId) => ({ type: LOAD, userId, })

/**
 * _loadResponse
 * @param userId
 * @param response
 * @private
 */
export const _loadResponse = (userId, response) => ({ type: LOAD, userId, response, })

/**
 * load
 * Gets user stats from API, and performs Keen analytics functions
 * Redux Action
 * Reference: http://redux.js.org/docs/basics/Actions.html
 * @param userId user id
 * @returns {Function}
 */
export function load(userId) {
    return (dispatch, getState) => {

        dispatch(_loadRequest(userId))

        axios.get(`${config.api.baseUrl}/stats/${userId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
        .then(res => {
            dispatch(_loadResponse(userId, res.data))
        })

        Keen.ready(function() {

            let itemViewsQuery = new Keen.Query("count", {
                event_collection: 'views',
                timeframe: 'this_30_days',
                filters: [{
                    "property_name": 'postAuthorId',
                    "operator": 'eq',
                    "property_value": userId
                }, {
                    "property_name": 'type',
                    "operator": 'eq',
                    "property_value": 'item'
                }]
            })

            keenClient.run(itemViewsQuery, function(err, res) {

                if (err) {
                    //console.log(err)
                    return
                }

                dispatch(_loadResponse(userId, {
                    'itemViews': res.result
                }))

            })

            let profileViewsQuery = new Keen.Query("count", {
                event_collection: 'views',
                timeframe: 'this_30_days',
                filters: [{
                    property_name: 'profileUser',
                    operator: 'eq',
                    property_value: userId
                }, {
                    property_name: 'type',
                    operator: 'eq',
                    property_value: 'user'
                }]
            })

            keenClient.run(profileViewsQuery, function(err, res) {

                if (err) {
                    //console.log(err)
                    return
                }

                dispatch(_loadResponse(userId, {
                    profileViews: res.result
                }))

            })

            let geoViewsQuery = new Keen.Query("count", {
                event_collection: 'views',
                timeframe: 'this_30_days',
                filters: [{
                    property_name: 'postAuthorId',
                    operator: 'eq',
                    property_value: userId
                }, {
                    property_name: 'type',
                    operator: 'eq',
                    property_value: 'item'
                }, {
                    property_name: 'ip_geo_info.city',
                    operator: 'ne',
                    property_value: null
                }],
                group_by: ['ip_geo_info.city', 'ip_geo_info.province', 'ip_geo_info.country'],
            })

            keenClient.run(geoViewsQuery, function(err, res) {
                if (err) {
                    //console.log(err)
                    return
                }
                dispatch(_loadResponse(userId, {
                    'geoViews': res.result.slice(0, 5)
                }))
            })

            let newFollowersQuery = new Keen.Query('sum', {
                event_collection: "follow",
                timeframe: "this_30_days",
                filters: [{
                    property_name: 'targetId',
                    operator: 'eq',
                    property_value: userId
                }],
                target_property: 'directionInt'
            })

            keenClient.run(newFollowersQuery, function(err, res) {

                if (err) {
                    //console.log(err)
                    return
                }

                dispatch(_loadResponse(userId, {

                    'newFollowers': res
                }))

            })

        })
    }
}

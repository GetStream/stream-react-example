import React from 'react'
import { browserHistory } from 'react-router'
import { BackButton } from 'components'

module.exports = {
    path: '/search-results',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./SearchResults').default)
    },

    /**
     * getHeaderLeft
     * @param location
     * @param cb {Function} callback
     */
    getHeaderLeft(location, cb) {
        cb(null, <BackButton label="Search" to={() => browserHistory.goBack()}/>)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <span />)
    },

    /**
     * getHeaderRight
     * @param location
     * @param cb {Function} callback
     */
    getHeaderRight(location, cb) {
        cb(null, <span />)
    }
}

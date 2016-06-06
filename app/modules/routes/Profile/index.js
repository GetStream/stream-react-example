import React from 'react'

import { BackButton } from 'components'

module.exports = {
    path: '/profile/:id',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Profile').default)
    },

    /**
     * getHeaderLeft
     * @param location
     * @param cb {Function} callback
     */
    getHeaderLeft(location, cb) {
        cb(null, <BackButton label="Profile"/>)
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
    },
}

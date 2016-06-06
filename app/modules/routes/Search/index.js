import React from 'react'

import { Nav, } from 'components'

module.exports = {
    path: '/search',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Search').default)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <Nav active="search"/>)
    }
}

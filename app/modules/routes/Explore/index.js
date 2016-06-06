import React from 'react'

import { Nav } from 'components'

module.exports = {
    path: '/explore',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Explore').default)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <Nav active="explore"/>)
    },
}

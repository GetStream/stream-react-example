import React from 'react'

import {
    Nav,
} from 'components'

module.exports = {
    path: '/profile/notifications',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Notifications').default)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <Nav active="notifications"/>)
    },
}

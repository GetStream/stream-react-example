import React from 'react'

import { BackButton } from 'components'

module.exports = {
    path: '/location',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Location').default)
    },

    /**
     * getHeaderLeft
     * @param location
     * @param cb {Function} callback
     */
    getHeaderLeft(location, cb) {
        cb(null, <BackButton label={location.query.q}/>)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <span />)
    },
}

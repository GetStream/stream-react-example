import React from 'react'
import { browserHistory } from 'react-router'

import { store } from '../../../../main'


import { BackButton } from 'components'

import config from 'config'


function observeStore(store, select, onChange) {
    let currentState

    function handleChange(unsubscribe) {
        let nextState = select(store.getState())
        if (nextState !== currentState) {
          currentState = nextState
          onChange(currentState, unsubscribe)
        }
    }

    let unsubscribe = store.subscribe(handleChange)
    handleChange(unsubscribe)
}

module.exports = {
    path: 'photos/:id',

    /**
     * getComponent
     * @param location
     * @param cb {Function} callback
     */
    getComponent(location, cb) {
        cb(null, require('./Photo').default)
    },

    /**
     * getHeaderLeft
     * @param location
     * @param cb {Function} callback
     */
    getHeaderLeft(location, cb) {
        cb(null, <BackButton to={() => browserHistory.push('/')}/>)
    },

    /**
     * getHeaderMiddle
     * @param location
     * @param cb {Function} callback
     */
    getHeaderMiddle(location, cb) {
        cb(null, <span />)
    },

    getHeaderRight(location, cb) {

        observeStore(store, state => state.Photo, (photo, unsubscribe) => {
            if (photo.id) {
                cb(null, (
                    <a
                        className="header-download"
                        href={`${config.imgix.baseUrl}/${photo.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2&dl=cabin&fm=png`}
                        target="_blank">
                        <i className="ion-ios-download-outline" />
                    </a>
                ))

                if (unsubscribe) unsubscribe()
            }
        })

    },

}

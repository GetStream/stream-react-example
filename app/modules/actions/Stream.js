import * as axios from 'axios'
import config from 'config'

import {
    Photos as PhotosActions,
    IncomingActivity as IncomingActivityActions,
} from 'actions'

export const CLEAR = 'STREAM_CLEAR'
export function clear() {
    return {
        type: CLEAR,
    }
}

export function timeline(data) {
    return dispatch => {

        Promise.all(data.new.map(p => {

            const id = p.object.split(':')[1]

            return (
                axios.get(`${config.api.baseUrl}/upload?id=${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('jwt')}`
                    },
                })
            )

        })).then(results => {
            dispatch(PhotosActions.inject(results.map(r => r.data)))
        })
    }
}


export const EVENT = 'STREAM_EVENT'

const _newEvent = data => ({ type: EVENT, count: data.new.length,})
export function event(data) {
    return dispatch => {
        dispatch(_newEvent(data))
        dispatch(IncomingActivityActions.load())
    }
}

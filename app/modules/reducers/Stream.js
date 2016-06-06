import {
    Stream as StreamActions,
} from 'actions'

function Stream(state = 0, action) {
    switch (action.type) {
        case StreamActions.EVENT:
            return state + 1

        case StreamActions.CLEAR:
            return 0
    }

    return state
}

export default Stream

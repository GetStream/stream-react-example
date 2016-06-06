import {
    FollowingActivity as FollowingActivityActions,
    User as UserActions,
    Profile as ProfileActions,
} from 'actions'

/**
 * Following Activity
 * Redux Reducer for Activity action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function FollowingActivity(state = [], action) {

    switch (action.type) {
        case FollowingActivityActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return state

        case ProfileActions.UNFOLLOW:
            return state.map((item) => {
                if (item.activities[0].actor.id === action.userID && item.verb == 'follow') {
                    const newItem = {...item}
                    newItem.activities[0].actor.following = 0
                    return newItem
                }
                return item
            })

        case ProfileActions.FOLLOW:
            if (action.response) {
                return state.map((item) => {
                    if (item.activities[0].actor.id === action.userID && item.verb == 'follow') {
                        const newItem = {...item}
                        newItem.activities[0].actor.following = 1
                        return newItem
                    }
                    return item
                })
            }
            return state
    }

    return state
}

export default FollowingActivity

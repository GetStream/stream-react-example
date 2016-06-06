import {
    Photos as PhotoActions,
} from 'actions'

/**
 * Photos
 * Redux Reducer for Photos action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Photos(state = [], action) {

    switch (action.type) {

        case PhotoActions.INJECT:
            if (action.posts) {
                const s = [...action.posts.map(r => ({...r, hidden: true}))]
                state.forEach(r => s.push(r))
                return s
            }
            return state

        case PhotoActions.LOAD_HIDDEN:
            return state.map(p => ({...p, hidden: false }))

        case PhotoActions.PAGINATE:
            if (action.response) {
                const s = [...state]
                action.response.forEach(r => s.push(r))
                return s
            }
            return state

        case PhotoActions.LOAD:
            if (action.response) {
                return [
                    ...action.response,
                ]
            }
            return []

        case PhotoActions.RELOAD:
            return [...action.response]

        case PhotoActions.LIKE:
            if (action.response) {
                return state.map(item => {

                    if (item.object.id == action.postID) {
                        const newItem = {...item}
                        newItem.object.liked = true
                        return newItem
                    }

                    return item
                })
            }

        case PhotoActions.UNLIKE:
            if (action.response) {
                return state.map(item => {

                    if (item.object.id == action.postID) {
                        const newItem = {...item}
                        newItem.object.liked = false
                        return newItem
                    }

                    return item
                })
            }


    }

    return state
}

export default Photos

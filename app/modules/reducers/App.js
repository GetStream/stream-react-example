import {
    App as AppActions,
} from 'actions'

/**
 * initialState
 * @type {{loading: boolean}}
 */
const initialState = { loading: true, }

/**
 * App
 * Redux Reducer for App action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function App(state = initialState, action) {

    switch (action.type) {

        case AppActions.INIT_DONE:
            return Object.assign({}, state, { loading: false, })
    }

    return state
}

export default App

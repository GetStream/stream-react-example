import {
    Stats as StatsActions,
} from 'actions'

/**
 * iniitalState
 * @type {{profileViews: {count: number, increment: number, color: string}, itemViews: {count: number, increment: number, color: string}, following: {count: number, increment: string, color: string}, followers: {count: number, increment: string, color: string}, mostViewed: Array, geoViews: Array}}
 */
const initialState = {
    profileViews: {
        'count': 0,
        'increment': 24,
        'color': 'green'
    },
    itemViews: {
        'count': 0,
        'increment': 24,
        'color':
        'green'
    },
    following: {
        'count': 0,
        'increment': '',
        'color': ''
    },
    followers: {
        'count': 0,
        'increment': '',
        'color': ''
    },
    mostViewed: [

    ],
    geoViews: []
}

/**
 * Stats
 * Redux Reducer for Stats action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Stats(state = initialState, action) {
    switch (action.type) {

        case StatsActions.LOAD:
            if (action.response) {
                if (action.response.itemViews >= 0) {
                  var newState = Object.assign({}, state, {
                      itemViews: {'count': action.response.itemViews},
                  })
                } else if (action.response.profileViews >= 0) {
                  var newState = Object.assign({}, state, {
                      profileViews: {'count': action.response.profileViews},
                  })
                } else if (action.response.mostViewed) {
                  var newState = Object.assign({}, state, {
                      mostViewed: action.response.mostViewed,
                  })
                } else if (action.response.geoViews) {
                  var newState = Object.assign({}, state, {
                      geoViews: action.response.geoViews,
                  })
                } else if (action.response.newFollowers) {
                  var newState = Object.assign({}, state)
                  var increment = action.response.newFollowers.result
                  newState['followers']['increment'] = increment
                  newState['followers']['color'] = (increment) ? 'green' : 'red'
                }

                return newState
            }

            return initialState

    }

    return state

}

export default Stats

export default function Navigation(state = {}, action) {
    switch (action.type) {
        case '@@router/LOCATION_CHANGE':
            return Object.assign({}, state, action.payload)
    }
    return state
}

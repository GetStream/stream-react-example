import * as PhotosActions from 'actions/Photos'
import * as ProfileActions from 'actions/Profile'

function Onboarding(state = [], action) {
    switch (action.type) {
        case PhotosActions.ONBOARDING:
            return [...action.response]

        case ProfileActions.FOLLOW:
            return state.filter(profile => profile.id != action.userID)
    }

    return state
}

export default Onboarding

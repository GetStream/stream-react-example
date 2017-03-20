import {
    Search as SearchActions,
} from 'actions'


/**
 * initialState
 * @type {{active: null, recent: Array, hits: Array, term: string, total: number, results: Array}}
 */
const initialState = {
    active: null,
    recent: [],
    hits: [],
    term: '',
    total: 0,

    results: []
}

/**
 * Search
 * Redux Reducer for Search action
 * Reference: http://redux.js.org/docs/basics/Reducers.html
 * @param state
 * @param action
 * @returns {*}
 * @constructor
 */
function Search(state = initialState, action) {

    switch (action.type) {
        case SearchActions.TRIGGER:
            if (action.response) {
                return Object.assign({}, state, { active: action.search })
            }
            return state

        case SearchActions.SEARCH:
            if (action.response) {
                return Object.assign({}, state, {
                    term: action.term,
                    total: action.response.nbHits,
                    hits: [
                        ...Object.values(action.response.hits.map(a => {
                            const keys = Object.keys(a._highlightResult)
                            let type
                            keys.forEach(key => {
                                if (a._highlightResult[key].matchLevel != 'none') {
                                    type = key
                                }
                            })
                            let word
                            switch (type) {
                                case 'hashtags':
                                    word = a._highlightResult[type].matchedWords[0]
                                break
                                case 'location':
                                    word = a.location
                                break
                            }
                            if (a.first_name) {
                                word = {
                                    email: a.email,
                                    id: a.id,
                                    name: `${a.first_name} ${a.last_name && a.last_name.charAt(0)}.`
                                }
                                type = 'user'
                            }
                            return {
                                word,
                                type,
                            }

                        }).filter(a => a.word).reduce((prev, a) => {

                            const word = a.word.email || a.word

                            if (prev[word + a.type]) {
                                prev[word + a.type].count++
                                return prev
                            }

                            prev[word + a.type] = {
                                word: a.word,
                                type: a.type,
                                count: 1,
                            }

                            return prev

                        }, {})),
                    ]
                })
            }
            return state

        case SearchActions.RECENT:
            if (action.response) {
                return Object.assign({}, state, {
                    recent: [...action.response],
                })
            }
            return state

        case SearchActions.RESULTS:
            if (action.response) {
                return Object.assign({}, state, {
                    results: [...action.response]
                })
            }
            return state

    }

    return state
}

export default Search

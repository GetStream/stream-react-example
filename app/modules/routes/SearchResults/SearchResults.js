import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from 'config'

import {
    Search as SearchActions,
} from 'actions'

/**
 * SearchResults
 * '/search-results'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class SearchResults extends Component {

    /**
    * componentDidMount
    */
    componentDidMount() {

      this.props.dispatch(SearchActions.results(
          this.props.location.query.type,
          this.props.location.query.q
      ))

    }

    /**
    * render
    * @returns markup
    */
    render() {

        return (

            <div className="page">
                <div className="search-results">
                    <div className="grid">
                        {this.props.search.results.map(item =>
                            <div className="grid-cell" key={`search-result-${item.filename}`}>
                                <Link to={`/photos/${item.id}`}>
                                    <img src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`} />
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
                {!this.props.search.results.length ? <div className="empty-message"><div>No results found</div></div> : null}
            </div>
        )
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({
    search: state.Search,
}))(SearchResults)

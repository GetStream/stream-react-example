import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from 'config'

import {
    Trending as TrendingActions,
} from 'actions'

/**
 * Trending
 * '/trending'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Trending extends Component {

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(TrendingActions.load())
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <div className="trending">
                    <div className="grid">
                        {this.props.trending.map(item =>
                            <div className="grid-cell" key={`trending-${item.id}`}>
                                <Link to={`/photos/${item.id}`}>
                                    <img src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`} />
                                </Link>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        )
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({ trending: state.Trending, }))(Trending)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from 'config'

import {
    Contributions as ContributionActions
} from 'actions'

/**
 * Contributions
 * '/profile/:id/contributions'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Contributions extends Component {

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(ContributionActions.load(this.props.params.id))
    }

    /**
     * renderFeedOrMessage
     * @returns markup
     */
    renderFeedOrMessage = () => {
        if (!this.props.contributions.length) {
            return (
                <div className="empty-message">
                    <div><Link to="/upload">Upload</Link> your first image to get started!</div>
                </div>
            )
        }
        return (
            <div className="contributions">
                <div className="grid">
                    {this.props.contributions.map(item =>
                        <div className="grid-cell" key={`contributions-${item.id}`}>
                            <Link to={`/photos/${item.id}`}>
                                <img
                                    src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}/>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )

    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page full-page">
                {this.renderFeedOrMessage()}
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
    contributions: state.Contributions,
}))(Contributions)

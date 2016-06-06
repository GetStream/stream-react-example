import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import numeral from 'numeral'

import {
    Photos as PhotoActions,
    Contributions as ContributionActions,
} from 'actions'

/**
 * Navigation
 * React component used by Profile route
 */
class Navigation extends Component {

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(ContributionActions.load(this.props.userID))
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div>
                <h2>Navigation</h2>
                <div className="navigation">
                    <Link to={`/profile/${this.props.userID}/contributions`}>
                        <div className="item">
                            <span>Contributions</span>
                            <span className="fill"></span>
                            <span>{numeral(this.props.contributions.length).format('0,0')}</span>
                        </div>
                    </Link>
                    <Link to={`/profile/${this.props.userID}/following-activity`}>
                        <div className="item">
                            <span>Following Activity</span>
                            <span className="fill"></span>
                            <span>{this.props.followingCount}</span>
                        </div>
                    </Link>
                    <Link to={`/profile/${this.props.userID}/stats`}>
                        <div className="item">
                            <span>Stats</span>
                        </div>
                    </Link>
                </div>
            </div>
        )
    }

}

export default connect(state => ({
    photos: state.Photos,
    contributions: state.Contributions,
}))(Navigation)

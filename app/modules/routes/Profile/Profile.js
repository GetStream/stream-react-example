import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import numeral from 'numeral'
import Ink from 'react-ink'
import { viewProfile, followUser } from 'utils/analytics'

import {
    Avatar,
} from 'components'

import {
    User as UserActions,
    Profile as ProfileActions,
    Contributions as ContributionActions,
    Photos as PhotosActions,
} from 'actions'

import Navigation from './navigation'
import Contributions from './contributions'

/**
 * Profile
 * '/profile/:id'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Profile extends Component {

    /**
     * handleFollowProfile
     */
    handleFollowProfile = () => {

        if (!this.props.profile.following) {
            this.props.dispatch(ProfileActions.follow(this.props.params.id))
                .then(res => {
                    this.props.dispatch(PhotosActions.reload())
                })
            followUser(this.props.user.id, this.props.params.id, 'follow')
        } else {
            followUser(this.props.user.id, this.props.params.id, 'unfollow')
            this.props.dispatch(ProfileActions.unfollow(this.props.params.id))
                .then(res => {
                    this.props.dispatch(PhotosActions.reload())
                })
        }

    }

    /**
     * handleLogout
     */
    handleLogout = () => {
        this.props.dispatch(UserActions.logout())
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(ProfileActions.load(this.props.params.id))
        this.props.dispatch(ContributionActions.load(this.props.params.id))
        viewProfile(this.props.user.id, this.props.params.id)
    }

    /**
     * renderFollowingButton
     * @returns {*}
     */
    renderFollowingButton = () => {
        if (this.props.user.id == this.props.params.id) return null

        let classes = ['follow-profile']
        let icon = 'ion-person-add'

        if (this.props.profile.following) {
            classes = ['following-profile']
            icon = 'ion-checkmark'
        }

        return (
            <div className={classes.join(' ')} onClick={this.handleFollowProfile}>
                <i className={icon}/>
                <Ink />
            </div>
        )
    }

    /**
     * renderNavigationOrStats
     * @returns markup
     */
    renderNavigationOrStats = () => {
        if (this.props.user.id == this.props.params.id) {
            return (
                <Navigation
                    userID={this.props.params.id}
                    incomingCount={this.props.incomingActivity.length}
                    followingCount={this.props.followingActivity.length}/>
            )
        }
        return (
            <Contributions
                userID={this.props.params.id}
                contributions={this.props.contributions}/>
        )
    }

    /**
     * renderLogOut
     */
    renderLogOut = () => {
        if (this.props.user.id == this.props.params.id) {
            return (
                <div>
                    <button onClick={this.handleLogout}>
                        Log Out
                        <Ink />
                    </button>
                </div>
            )
        }
        return null
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                {this.renderFollowingButton()}
                <div className="profile">
                    <h1>Profile</h1>
                    <div className="artist">
                        <div className="avatar">
                            <Avatar emailHash={this.props.profile.email_md5}/>
                        </div>
                        <div className="name">
                            {this.props.profile.first_name} <br />{this.props.profile.last_name && this.props.profile.last_name.charAt(0) + '.'}
                        </div>
                        <div className="follow-count">
                            <div className="following">
                                <span className="count">{numeral(this.props.profile.following_count).format('0,0')}</span>&nbsp;
                                Following
                            </div>
                            <div className="followers">
                                <span className="count">{numeral(this.props.profile.follower_count).format('0,0')}</span>&nbsp;
                                Followers
                            </div>
                        </div>
                    </div>
                    <div className="clear"></div>
                    {this.renderNavigationOrStats()}
                    {this.renderLogOut()}
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
export default connect(state => ({
    user: state.User,
    profile: state.Profile,
    contributions: state.Contributions,
    incomingActivity: state.IncomingActivity,
    followingActivity: state.FollowingActivity,
}))(Profile)

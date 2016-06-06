import React, { Component } from 'react'

import Actor from './Actor'

/**
 * Following component
 */
export default class Following extends Component {

    /**
     *
     * @type {{actor: {}, user: {}, timestamp: null, timeSince: string, following: boolean, onFollowBack: Following.defaultProps.onFollowBack, onUnfollow: Following.defaultProps.onUnfollow}}
     */
    static defaultProps = {
        actor: {},
        user: {},
        time: null,
        timeSince: '',
        following: false,

        onFollowBack: () => {
        },
        onUnfollow: () => {
        },
    }

    /**
     * handleFollowBack
     * @param e
     */
    handleFollowBack = (e) => {
        e.preventDefault()

        this.props.onFollowBack(e, this.props.actor)
    }

    /**
     * handleUnfollow
     * @param e
     */
    handleUnfollow = (e) => {
        e.preventDefault()

        this.props.onUnfollow(e, this.props.actor)
    }

    /**
     * renderFollowButton
     * @returns markup
     */
    renderFollowButton = () => {

        if (this.props.following) {
            return (
                <div className="follow-btn">
                    <button className="following" onClick={this.handleUnfollow}>Following</button>
                </div>
            )
        }

        return (
            <div className="follow-btn">
                <button onClick={this.handleFollowBack}>Follow</button>
            </div>
        )

    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div>
                <Actor {...this.props.actor} />
                {this.renderFollowButton()}
                <div className="vertical-line">
                    <i className="ion-checkmark-round green"></i>
                </div>
                <div className="message">
                    <p>Followed, {this.props.timeSince}</p>
                </div>
                <div className="clear"></div>
                <Actor {...this.props.user} />
                <div className="follow-btn">
                    <button className="following">Following</button>
                </div>
                <div className="clear"></div>
            </div>
        )
    }
}

import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import Ink from 'react-ink'
import config from 'config'

import {
    PhotoList,
    Avatar,
} from 'components'

import Actor from 'components/Activity/Actor'

import {
    User as UserActions,
    Photos as PhotosActions,
    Profile as ProfileActions,
} from 'actions'

class Onboarding extends Component {

    render() {

        if (!this.props.users.length) return null;

        return (
            <div className="onboarding">
                {this.props.users.map(user => (
                    <div className="user" key={`onboarding-${user.id}`}>
                        <Link to={`/profile/${user.id}`} key={user.id} className="user-info">
                            <Avatar emailHash={user.email_md5} height={50} />
                            <span>{user.first_name} <br />{user.last_name && user.last_name.charAt(0) + '.'}</span>
                        </Link>
                        <div className="follow-btn">
                            <button onClick={() => this.props.onFollow(user.id)}>Follow</button>
                        </div>
                    </div>
                ))}

            </div>
        )
    }
}

/**
 * Landing
 * Landing component used by Home route
 */
class Landing extends Component {

    /**
     * defaultProps
     * @type {{onFetch: Landing.defaultProps.onFetch}}
     */
    static defaultProps = {
        onFetch: () => {},
    }

    /**
     * handleScroll
     * @param e event
     */
    handleScroll = (e) => {

        if (this.$scroll) clearTimeout(this.$scroll)

        this.$scroll = setTimeout(() => {

            const d = findDOMNode(this._pageElm)
            const threshold = (d.offsetHeight / 2)

            if ((d.scrollTop + d.offsetHeight) >= (d.scrollHeight - threshold)) {
                this.props.onFetch()
            }

        }, 25)
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        findDOMNode(this._pageElm).addEventListener('scroll', this.handleScroll)
    }

    /**
     * componentWillUnmount
     */
    componentWillUnmount() {
        findDOMNode(this._pageElm).removeEventListener('scroll', this.handleScroll)
    }


    /**
     * handleRefresh
     * @param e event
     */
    handleRefresh = (e) => {
        this.props.onLoadHidden()
    }

    /**
     *
     * @returns markup
     */
    renderListOrMessage = () => {

        if (!this.props.photos.length) return

        return (
            <div>
                <PhotoList onLike={this.props.onLike} photos={this.props.photos.filter(p => !p.hidden)}/>
                {this.props.photos.filter(p => p.hidden).length
                    ? (<button className="load-posts" onClick={this.handleRefresh}>
                        Load New Posts
                        <Ink />
                    </button>
                ) : null}
            </div>
        )

    }


    /**
     *
     * @returns markup
     */
    render() {
        return (
            <div className="page full-page" ref={c => this._pageElm = c}>
                <Onboarding users={this.props.onboarding} onFollow={this.props.onFollow} />
                {this.renderListOrMessage()}
                <Link to={`/upload`}>
                    <div className="add-photo">
                        <img src="/img/add.svg" />
                        <Ink />
                    </div>
                </Link>
            </div>
        )
    }
}

/**
 * Home
 * '/'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Home extends Component {

    /**
     * handleLike
     * @param data
     */
    handleLike = (data) => {
        this.props.dispatch(PhotosActions[data.liked ? 'like' : 'unlike'](data.id))
    }

    /**
     * handleFetch
     */
    handleFetch = () => {
        this.props.dispatch(PhotosActions.paginate())
    }

    handleLoadHidden = () => {
        this.props.dispatch(PhotosActions.loadHidden())
    }

    handleFollow = userID => {
        this.props.dispatch(ProfileActions.follow(userID)).then(followed => {
            this.props.dispatch(PhotosActions.reload())
        })

    }

    /**
     * render
     * @returns {*|markup}
     */
    render() {
        return (this.props.children ||
        <Landing tokens={this.props.tokens} onFetch={this.handleFetch} photos={this.props.photos}
                 userID={this.props.userID} onLike={this.handleLike} onLoadHidden={this.handleLoadHidden}
                 onboarding={this.props.onboarding} onFollow={this.handleFollow}/>)
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({
    user: state.User,
    tokens: state.Tokens,
    photos: state.Photos,
    onboarding: state.Onboarding,
}))(Home)

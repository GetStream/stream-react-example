import React, {Component} from 'react'
import { Link } from 'react-router'
import config from 'config'

import {
    LikeButton,
    Avatar,
} from 'components'

import PhotoFooter from './PhotoFooter'

class Actor extends Component {
    render() {
        return (
            <div className="actor">
                <Link to={`/profile/${this.props.id}`}>
                    <Avatar
                        emailHash={this.props.email_md5}
                        height={32} />
                </Link>
                <span><strong>
                    <Link to={`/profile/${this.props.id}`}>{this.props.first_name} {this.props.last_name && this.props.last_name.charAt(0) + '.'}</Link>
                </strong></span>
            </div>
        )
    }
}

/**
 * PhotoItem component
 */
class PhotoItem extends Component {

    /**
     * render
     * @returns markup
     */
    render() {

        return (
            <li className="feed-item">
                <header>
                    <div>
                        <Actor {...this.props.actor} />
                    </div>
                    <div className="actions">
                        <span>
                            <LikeButton
                                id={this.props.object.id}
                                userID={this.props.object.user_id}
                                liked={this.props.object.liked}
                                onLike={this.props.onLike} />
                        </span>
                        <Link to={`/photos/${this.props.object.id}`}>
                            <span><i className="ion-ios-chatbubble-outline"></i></span>
                        </Link>
                    </div>
                </header>
                <Link to={`/photos/${this.props.object.id}`}>
                    <img
                        src={`${config.imgix.baseUrl}/${this.props.object.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}
                        className="full-width"/>
                </Link>
                <footer>
                    <PhotoFooter {...this.props.object} />
                </footer>
            </li>
        )
    }
}

export default PhotoItem

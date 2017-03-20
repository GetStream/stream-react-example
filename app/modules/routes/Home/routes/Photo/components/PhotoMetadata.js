import React, { Component } from 'react'
import { Link } from 'react-router'
import numeral from 'numeral'

import {
    Avatar,
} from 'components'

/**
 * PhotoMetadata
 * React component to be used by PhotoPage component
 */
class PhotoMetadata extends Component {

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="photo-metadata">
                <Link to={`/profile/${this.props.user_id}`}>
                    <div className="artist">
                        <Avatar emailHash={this.props.email_md5} height={50}/>
                        {this.props.first_name} {this.props.last_name && this.props.last_name.charAt(0) + '.'}
                    </div>
                </Link>
                <div className="like-count">
                    <i className="ion-ios-heart"></i> {numeral(this.props.likes).format('0,0')} {this.props.likes === 1 ? 'Like' : 'Likes' }
                </div>
            </div>
        )
    }

}

export default PhotoMetadata

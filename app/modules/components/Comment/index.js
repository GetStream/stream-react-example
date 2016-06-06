import React, { Component } from 'react'
import { Link } from 'react-router'
import TimeAgo from '../TimeAgo'

/**
 * Comment index component
 */
class Comment extends Component {

    /**
     *
     * @returns markup
     */
    render() {
        return (
            <div className="comment">
                <Link to={`/profile/${this.props.userId}`}>
                    <div className="actor">
                        {this.props.firstName} {this.props.lastName.charAt(0) + '.'}
                    </div>
                </Link>
                <div className="time">
                    <TimeAgo timestamp={this.props.createdAt}/>
                </div>
                <div className="text">
                    {this.props.comment}
                </div>
            </div>
        )
    }

}

export default Comment

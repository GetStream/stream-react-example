import React, { Component } from 'react'
import { Avatar } from 'components'
import { Link } from 'react-router'
/**
 * Actor component
 */
export default class Actor extends Component {

    /**
     * defaultProps
     * @type {{avatar: string, email: string, firstName: string, lastName: string}}
     */

    static defaultProps = {
        avatar: '',
        first_name: '',
        last_name: '',
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <Link to={`/profile/${this.props.id}`}>
            <div className="actor">
                <div className="avatar">
                    <Avatar emailHash={this.props.email_md5} height={50}/>
                </div>
                <div className="name">{this.props.first_name} <br/>{this.props.last_name && this.props.last_name.charAt(0) + '.'}</div>
            </div>
            </Link>
        )
    }
}

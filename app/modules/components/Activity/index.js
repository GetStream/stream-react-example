import React, { Component, cloneElement } from 'react'

export Actor from './Actor'
export Following from './Following'
export Liked from './Liked'
export Commented from './Commented'

import moment from 'moment'

/**
 * Activity index component
 */
export class Item extends Component {

    /**
     * defaultProps
     * @type {{type: null, timestamp: null, actor: {}}}
     */
    static defaultProps = {
        verb: null,
        time: null,
        actor: {},
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <li className={this.props.verb}>
                {cloneElement(this.props.children, {
                    timestamp: this.props.time,
                    actor: this.props.actor,
                    timeSince: moment.utc(this.props.time).fromNow(),
                })}
            </li>
        )
    }
}

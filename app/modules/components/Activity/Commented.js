import React, { Component } from 'react'

import Actor from './Actor'
import { Link } from 'react-router'
import config from 'config'

/**
 * Commented component
 */
export default class Commented extends Component {

    /**
     * defaultProps
     * @type {{actor: {}, user: {}, timestamp: null, timeSince: string}}
     */
    static defaultProps = {
        actor: {},
        user: {},
        time: null,
        timeSince: '',
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
          <div>
            <div className="top">
                <Actor {...this.props.actor} />
                <Link to={`/photos/${this.props.object.id}`}>
                    <img src={`${config.imgix.baseUrl}/${this.props.object.filename}?auto=enhance&w=25&h=25&fit=crop&fm=png&dpr=2`} />
                </Link>
            </div>
            <div className="clear"></div>
            <div className="quote">
                <span className="prime"><i>&#34;</i></span>
                <p>{this.props.comment}</p>
            </div>
          </div>
        )
    }
}

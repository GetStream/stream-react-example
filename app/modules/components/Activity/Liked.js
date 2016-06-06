import React, { Component } from 'react'
import { Link } from 'react-router'
import config from 'config'

import Actor from './Actor'

const Picture = props => (
    <div className="grid-cell">
        <Link to={`/photos/${props.id}`}>
            <img src={`${config.imgix.baseUrl}/${props.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}/>
        </Link>
    </div>
)

/**
 * Liked component
 */
export default class Liked extends Component {

    /**
     * defaultProps
     * @type {{pictures: Array}}
     */
    static defaultProps = {
        activities: [],
    }

    /**
     * renderMessage
     * @returns {*}
     */
    renderMessage = () => {
        if (this.props.activity_count === 1) return 'Liked your picture'
        return `Liked ${this.props.activity_count} pictures`
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div>
                <Actor {...this.props.actor} />
                <div className="vertical-line">
                    <i className="ion-ios-heart"></i>
                </div>
                <div className="message">
                    <p>{this.renderMessage()}, {this.props.timeSince}</p>
                </div>
                <div className="clear"></div>
                <div className="photos">
                    <div className="grid">
                        {this.props.activities.slice(0,6).map((p, i) => <Picture key={`picture-${i}`} {...p.object} />)}
                    </div>
                </div>
            </div>
        )
    }
}

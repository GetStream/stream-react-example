import React, { Component } from 'react'
import { Link } from 'react-router'


/**
 * BackButton index component
 */
class BackButton extends Component {

    /**
     * defaultProps
     * @type {{to: string, icon: XML, label: string}}
     */
    static defaultProps = {
        to: '/',
        icon: <i className="ion-chevron-left" style={{ marginRight: 6 }}/>,
        label: 'Back',
    }

    /**
     * render
     * @returns markup
     */
    render() {

        const content = <span>{this.props.icon}{this.props.label}</span>

        if (typeof this.props.to == 'string') {
            return (
                <Link to={this.props.to}>{content}</Link>
            )
        }

        return <a href="#" onClick={this.props.to}>{content}</a>

    }

}

export default BackButton

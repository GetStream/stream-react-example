import React, { Component } from 'react'
import { Link } from 'react-router'
import config from 'config'

/**
 * Contributions
 * React component to be used by Profile component
 */
export default class Contributions extends Component {

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="contributions">
                <h2>Contributions</h2>
                <div className="grid">
                    {this.props.contributions.map(item =>
                        <div className="grid-cell" key={`contributions-${item.id}`}>
                            <Link to={`/photos/${item.id}`}>
                                <img
                                    src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}/>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        )
    }

}

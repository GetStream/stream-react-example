import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from 'config'

import {
    Explore as ExploreActions
} from 'actions'


/**
 * Explore
 * '/explore'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Explore extends Component {

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(ExploreActions.load())
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <Link to={`/trending`}>
                    <div className="see-all">
                        See All&#8811;
                    </div>
                </Link>
                <div className="explore">
                    <h1>Trending</h1>
                    <div>
                        <img
                            src="//react-example-app.imgix.net/defaults/tumblr_ny9verGf7m1qzwmsso1_1280.jpg?auto=enhance&w=175&h=132&fit=crop&fm=png&dpr=2"/>
                    </div>
                    <div>
                        <img
                            src="//react-example-app.imgix.net/defaults/tumblr_nxiqjsDFTK1qzwmsso1_1280.jpg?auto=enhance&w=124&h=95&fit=crop&fm=png&dpr=2"/>
                    </div>
                    <div>
                        <img
                            src="//react-example-app.imgix.net/defaults/tumblr_nylyc2IsOi1qzwmsso1_1280.jpg?auto=enhance&w=174&h=132&fit=crop&fm=png&dpr=2"/>
                    </div>
                </div>
                <div className="explore-grid">
                    <h2>New</h2>
                    <div className="grid">
                        {this.props.explore.map(item =>
                            <div className="grid-cell" key={`explore-${item.id}`}>
                                <Link to={`/photos/${item.id}`}>
                                    <img
                                        src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}/>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        )
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({
    explore: state.Explore,
}))(Explore)

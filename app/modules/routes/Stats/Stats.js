import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from 'config'

import {
    Stats as StatsActions,
    Profile as ProfileActions,
} from 'actions'

import { Link } from 'react-router'

/**
 * UploadStats
 * React component used by Stats route
 */
class UploadStats extends Component {
    render() {
        return (
            <div>
                <Link to={`/photos/${this.props.id}`}>
                    <div>
                        <img src={`${config.imgix.baseUrl}/${this.props.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`} className="full-width" />
                    </div>
                    <div className="footer-content">
                        {this.props.caption} in <strong>{this.props.location}</strong>
                        <div className="clear"></div>
                        <i className="ion-ios-heart"></i> <span className="red">{this.props.viewCount} Views</span>
                    </div>
                </Link>
            </div>
        )
    }
}

/**
 * Stats
 * '/profile/:id/stats'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Stats extends Component {

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(StatsActions.load(this.props.params.id))
        this.props.dispatch(ProfileActions.load(this.props.params.id))
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <div className="stats">
                    <div className="grid">
                        <div className="row">
                            <div className="col">
                                <div className="item">
                                    <h1>Profile Views</h1>
                                    {this.props.stats.profileViews.count}&nbsp;
                                    <span className={this.props.stats.profileViews.color}>
                                        {this.props.stats.profileViews.increment}
                                    </span>
                                </div>
                                <div className="item">
                                    <h1>Following</h1>
                                    {this.props.profile.following_count}&nbsp;
                                    <span className={this.props.stats.following.color}>
                                        {this.props.stats.following.increment}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="item">
                                    <h1>Item Views</h1>
                                    {this.props.stats.itemViews.count}&nbsp;
                                    <span className={this.props.stats.itemViews.color}>
                                        {this.props.stats.itemViews.increment}
                                    </span>
                                </div>
                                <div className="item">
                                    <h1>Followers</h1>
                                    {this.props.profile.follower_count}&nbsp;
                                    <span className={this.props.stats.followers.color}>
                                        {this.props.stats.followers.increment}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="most most-views-from content">
                        <h1>Most Views from</h1>
                        <ol>
                        {this.props.stats.geoViews.map(geo =>
                            <li>{geo['ip_geo_info.city']}, {geo['ip_geo_info.province']}, {geo['ip_geo_info.country']}: {geo.result}</li>
                        )}
                        </ol>
                    </div>
                    <div className="most most-views content">
                        <h1>Most Views</h1>
                        {this.props.stats.mostViewed.map(upload => <UploadStats key={`upload-${upload.id}`} {...upload} />)}
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
    stats: state.Stats,
    profile: state.Profile,
}))(Stats)

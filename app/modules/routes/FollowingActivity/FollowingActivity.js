import React, { Component } from 'react'
import { Link } from 'react-router'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {
    Activity,
} from 'components'

import {
    FollowingActivity as FollowingActivityActions,
    User as UserActions,
    Profile as ProfileActions,
    Photos as PhotosActions,
} from 'actions'

/**
 * FollowingActivity
 * '/profile/:id/following-activity'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class FollowingActivity extends Component {

    /**
     * handleFollowBack
     * @param e
     * @param user
     */
    handleFollowBack = (e, user) => {
        this.props.dispatch(ProfileActions.follow(user.id)).then(res => {
            this.props.dispatch(PhotosActions.reload())
        })
    }

    /**
     * handleUnfollow
     * @param e
     * @param user
     */
    handleUnfollow = (e, user) => {
        this.props.dispatch(ProfileActions.unfollow(user.id)).then(res => {
            this.props.dispatch(PhotosActions.reload())
        })
    }

    /**
     * renderFeedOrMessage
     * @returns markup
     */
    renderFeedOrMessage = () => {
        if (!this.props.activity.length) {
            return (
                <div className="empty-message">
                    <div>Check out the <Link to="/explore">explore page</Link> to get started!</div>
                </div>
            )
        }
        return (
            <div className="following-activity">
                <ul className="timeline">
                  {this.props.activity.map(item => {

                      let child

                      if (item.activities) {
                        switch (item.activities[0].verb) {
                            case 'follow':
                                child = (
                                  <Activity.Following
                                      onFollowBack={this.handleFollowBack}
                                      onUnfollow={this.handleUnfollow}
                                      following={item.activities[0].actor.following}
                                      actor={this.props.actor}
                                      user={item.activities[0].object}
                                      time={item.time}
                                      />
                                )
                                break
                            case 'comment':
                                child = <Activity.Commented {...item.activities[0]}/>
                                break
                            case 'like':
                                child = <Activity.Liked activities={item.activities}
                                      activity_count={item.activity_count}
                                 />
                                break
                            default:
                                return
                        }
                      }

                      return (
                          <Activity.Item
                              key={`activity-item-${item.group}`}
                              verb={item.activities[0].verb}
                              time={item.updated_at}
                              actor={item.activities[0].actor}>
                              {child}
                          </Activity.Item>
                      )
                  })}
                </ul>
            </div>
        )
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page full-page">
                {this.renderFeedOrMessage()}
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
    activity: state.FollowingActivity,
    user: state.User,
}))(FollowingActivity)

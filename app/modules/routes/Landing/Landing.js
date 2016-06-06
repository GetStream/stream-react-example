import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import {
    User as UserActions
} from 'actions'

/**
 * Landing
 * '/landing'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Landing extends Component {

    /**
     * handleFBLogin
     * @param e event
     */
    handleFBLogin = (e) => {
        e.preventDefault()
        FB.login(res => {
            if (res.status === 'connected') {
                window.location.reload()
                return
            }
        }, {
            scope: 'public_profile,email',
            auth_type: 'rerequest'
        })
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="landing">
                <div className="facebook-login-root">
                    <button className="facebook-login" onClick={this.handleFBLogin}>
                        <i className="ion-social-facebook"></i> Continue With Facebook
                    </button>
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
    user: state.User,
}))(Landing)

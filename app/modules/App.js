import React, { Component, cloneElement } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

import stream from 'getstream'
import config from 'config'

const Home = require('./routes/Home/Home').default

import {
    App as AppActions,
    User as UserActions,
    Photos as PhotoActions,
    Header as HeaderActions,
    Stream as StreamActions,
} from 'actions'

import {
    Header,
} from 'components'

@connect(state => ({
    header: state.Header,
    user: state.User,
}))

/**
 * AppHeader component
 */
class AppHeader extends Component {

    /**
     * render
     * @returns markup
     */
    render() {

        const { header, user, router, } = this.props

        return (
            <Header
                left={header.left}
                middle={header.middle}
                right={header.right}
                router={router}
                userID={user.id} />
        )
    }
}

/**
 * handleRouteChange
 * @param dispatch
 * @param route
 * @param location
 */
function handleRouteChange(dispatch, route, location) {
    if (route) {

        if (route.getHeaderLeft) {
            route.getHeaderLeft(location, (err, component) => {
                dispatch(HeaderActions.left(component))
            })
        } else {
            dispatch(HeaderActions.left(null))
        }

        if (route.getHeaderMiddle) {
            route.getHeaderMiddle(location, (err, component) => {
                dispatch(HeaderActions.middle(component))
            })
        } else {
            dispatch(HeaderActions.middle(null))
        }

        if (route.getHeaderRight) {
            route.getHeaderRight(location, (err, component) => {
                dispatch(HeaderActions.right(component))
            })
        } else {
            dispatch(HeaderActions.right(null))
        }

    }
}

/**
 * App component
 * Bootstraps application
 */
class App extends Component {

    static contextTypes = {
        router: React.PropTypes.object.isRequired,
    }

    componentWillMount() {
        // instantiate a new client (client side)
        this.client = stream.connect(config.stream.key, null, config.stream.appId)
    }

    /**
     * componentDidUpdate
     * @param oldProps
     * @returns {*}
     */
    componentDidUpdate(oldProps) {

        handleRouteChange(
            this.props.dispatch,
            this.props.routes[this.props.routes.length - 1],
            this.props.location
        )

        if (oldProps.user.id != this.props.user.id && !this.props.user.id) {
            return browserHistory.push('/landing')
        }

        if (oldProps.user.id != this.props.user.id && this.props.user.id) {
            this.connectToStream()
            this.props.dispatch(AppActions.init())
        }

    }

    /**
     * componentDidMount
     */
    componentDidMount() {

        const { dispatch } = this.props

        FB.getLoginStatus(res => {
            if (res.status !== 'connected') {
                if (this.props.location.pathname != '/landing') {
                    browserHistory.replace('/landing')
                }
                this.props.dispatch(AppActions.initDone())
                return
            }

            dispatch(UserActions.fbLogin(res))

            if (this.props.location.pathname == '/landing') {
                browserHistory.replace('/')
            }

        })

    }

    connectToStream = () => {
        // follow 'timeline_flat' feed
        this.timeline = this.client.feed('timeline_flat', this.props.user.id, this.props.tokens.timelineFlat)
        this.timeline
            .subscribe(data => {
                this.props.dispatch(StreamActions.timeline(data))
            })
            .then(() => {
                //console.log('Full (Timeline Flat): Connected to faye channel, waiting for realtime updates');
            }, (err) => {
                console.error('Full (Timeline Flat): Could not estabilsh faye connection', err);
            });

        // follow 'notifications' feed
        this.notification = this.client.feed('notification', this.props.user.id, this.props.tokens.notification)
        this.notification
            .subscribe(data => {
                this.props.dispatch(StreamActions.event(data))
            })
            .then(() => {
                //console.log('Full (Notifications): Connected to faye channel, waiting for realtime updates');
            }, (err) => {
                console.error('Full (Notifications): Could not estabilsh faye connection', err);
            });
    }

    /**
     * render
     * @returns markup
     */
    render() {

        if (this.props.loading) return <div className="loader">Loading...</div>

        if (this.props.location.pathname == '/landing') {
            return (
                <div id="root">
                    {this.props.children || <Home />}
                </div>
            )
        }

        return (
            <div id="root">
                <AppHeader />
                {this.props.children || <Home userID={this.props.user.id} />}
            </div>
        )

    }

}

export default connect(state => ({
    user: state.User,
    loading: state.App.loading,
    tokens: state.Tokens,
}))(App)

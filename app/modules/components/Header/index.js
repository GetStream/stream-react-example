import React, {Component} from 'react'
import { connect } from 'react-redux'
import { Link, IndexLink, withRouter } from 'react-router'

import Nav from '../../components/Nav'

/**
 * Left component
 */
class Left extends Component {

    state = {
        step: 0,
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextProps.step !== this.state.step
    }

    componentDidMount() {
        if (this.props.active) {
            setTimeout(() =>
                this.setState({ step: this.state.step + 1}), 1)
        }
    }

    componentDidUpdate(oldProps, oldState) {
        if (this.props.active != oldProps.active) {

            if (this.props.active) {
                setTimeout(() =>
                    this.setState({ step: this.state.step + 1}), 1)
            } else {
                this.setState({ step: 0, })
            }
        }

    }

    getClasses = () => {
        const classes = ['item', 'left']

        if (this.props.active) {
            classes.push(
                this.state.step === 0 ? 'active-initial' : 'active'
            )

        }

        return classes
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className={this.getClasses().join(' ')}>
                <IndexLink to={`/`}>
                    <img src="/img/logo.svg" width="108" height="32"/>
                </IndexLink>
            </div>
        )
    }

}

/**
 * Right component
 */
class Right extends Component {

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="item right">
                <Link to={`/profile/${this.props.id}`} activeClassName="active">
                    <img src="/img/nav_icon.svg" width="23" height="12"/>
                </Link>
            </div>
        )
    }

}

/**
 * Header index component
 */
class Header extends Component {

    /**
     * defaultProps
     * @type {{userID: null, left: markup, middle: markup}}
     */
    static defaultProps = {
        userID: null,

        left: <Left />,
        middle: <Nav />,
    }

    /**
     * render
     * @returns markup
     */
    render() {


        const leftActive = this.props.router.isActive({ pathname: '/' }, true)
        // const rightActive = this.props.router.isActive({ pathname: `/profile/${this.props.user.id}`})
        const right = this.props.right || <Right id={this.props.userID} />
        const left = this.props.left || <Left active={leftActive} />
        const middle = this.props.middle || <Nav notifications={this.props.notifications} />

        return (
            <header className="container top">
                {left}
                {middle}
                {right}
            </header>
        )
    }

}

export default connect(state => ({
    navigation: state.Navigation,
    user: state.User,
}))(withRouter(Header))

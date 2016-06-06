import React, { Component } from 'react'

import moment from 'moment'

/**
 * TimeAgo index component
 */
class TimeAgo extends Component {

    /**
     * defaultProps
     * @type {{updateDuration: number, timestamp: null}}
     */
    static defaultProps = {
        updateDuration: 30000,
        timestamp: null,
    }

    /**
     * state
     * @type {{i: number}}
     */
    state = {i: 0,}

    /**
     * componentDidMount
     */
    componentDidMount() {
        /**
         * this.$i
         * @type {number|*}
         */
        this.$i = setInterval(() => {
            this.setState({i: (this.state.i + 1)})
        }, this.props.updateDuration)
    }

    /**
     * componentWillUnmount
     */
    componentWillUnmount() {
        clearInterval(this.$i)
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return <span>{moment.utc(this.props.timestamp).fromNow()}</span>
    }

}

export default TimeAgo

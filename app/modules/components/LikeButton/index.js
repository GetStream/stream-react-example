import React, { Component } from 'react'
import { connect } from 'react-redux'
import { likePhoto } from 'utils/analytics'

import {
    User as UserActions,
} from 'actions'

/**
 * LikeButton index component
 */
class LikeButton extends Component {

    /**
     * defaultProps
     * @type {{id: string, onLike: LikeButton.defaultProps.onLike}}
     */
    static defaultProps = {
        id: '',
        onLike: () => {},
    }

    /**
     * handleClick
     * @param e event
     */
    handleClick = (e) => {
        this.props.onLike({id: this.props.id, liked: !this.props.liked})
        if (!this.props.liked) {
            likePhoto(this.props.user.id, this.props.id)
        }
    }

    /**
     * render
     * @returns markup
     */
    render() {
        let classes = ['item']
        if (this.props.liked) classes.push('ion-ios-heart')
        if (!this.props.liked) classes.push('ion-ios-heart-outline')

        return <i className={classes.join(' ')} onClick={this.handleClick}/>
    }

}

export default connect(state => ({
    user: state.User,
}))(LikeButton)

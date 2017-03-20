import React, { Component } from 'react'
import { connect } from 'react-redux'
import config from 'config'

import { viewPhoto } from 'utils/analytics'

import { PhotoFooter } from 'components/PhotoList'
import PhotoMetadata from './components/PhotoMetadata'
import PhotoComments from './components/PhotoComments'

import {
    Photo as PhotoActions,
    Comments as CommentActions,
    Like as LikeActions,
} from 'actions'

/**
 * PhotoPage component used by Home route
 */
class PhotoPage extends Component {

    /**
     * defaultProps
     * @type {{photo: {loading: boolean}}}
     */
    static defaultProps = {
        photo: {
            loading: true,
        },
    }

    /**
     * componentDidUpdate
     * @param oldProps
     */
    componentDidUpdate(oldProps) {
        if (oldProps.photo.id != this.props.photo.id) {
            viewPhoto(this.props.user.id, this.props.params.id, this.props.photo.user_id)
        }
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        this.props.dispatch(PhotoActions.load(this.props.params.id))
    }

    /**
     * handleLike
     * @param data
     * @returns {*}
     */
    handleLike = (data) => {
        if (this.props.likes.liked) {
            return this.props.dispatch(LikeActions.deleteLike(data.id))
        }
        this.props.dispatch(LikeActions.like(data.id))
    }

    /**
     * handleComment
     * @param post
     * @param data
     */
    handleComment = (post, data) => {
        this.props.dispatch(CommentActions.addComment(post, data))
    }

    /**
     * render
     * @returns markup
     */
    render() {
        if (this.props.photo.loading || !this.props.photo.filename) return <div className="loader">Loading...</div>

        return (
            <div className="page">
                <img
                    src={`${config.imgix.baseUrl}/${this.props.photo.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}
                    className="full-width"/>
                <PhotoFooter
                    {...this.props.photo}
                    onLike={this.handleLike}
                    showLike={true}
                    liked={this.props.likes.liked}/>
                <div className="clear"></div>
                <PhotoMetadata
                    likes={this.props.likes.likes}
                    liked={this.props.likes.liked}
                    {...this.props.photo} />
                <div className="clear"></div>
                <PhotoComments
                    id={this.props.photo.id}
                    comments={this.props.comments.comments}
                    onComment={this.handleComment}/>
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
    photo: state.Photo,
    comments: state.Comments,
    likes: state.Likes,
    user: state.User,
}))(PhotoPage)

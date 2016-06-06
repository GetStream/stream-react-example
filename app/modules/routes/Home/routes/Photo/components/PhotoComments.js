import React, { Component } from 'react'

import Header from 'components/Header'
import { PhotoFooter } from 'components/PhotoList'
import PhotoMetadata from './PhotoMetadata'

import {
    Comment,
} from 'components'

/**
 * PhotoPage
 * React component to be used by PhotoPage component
 */
class PhotoPage extends Component {

    /**
     * state
     * @type {{value: string}}
     */
    state = {
        value: '',
    }

    /**
     * handleSubmit
     * @param e event
     */
    handleSubmit = (e) => {
        e.preventDefault()

        this.props.onComment(this.props.id, this.state.value)
        this.setState({value: '',})
    }

    /**
     * handleChange
     * @param e event
     */
    handleChange = (e) => this.setState({value: e.target.value,})

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div>
                <div className="photo-comments">
                    {this.props.comments.map(comment => <Comment key={`comment-${comment.id}`} {...comment} />)}
                </div>
                <div className="add-comment">
                    <form action="#" onSubmit={this.handleSubmit}>
                        <input type="text" onChange={this.handleChange} placeholder="Add comment..." maxLength="60"
                               value={this.state.value}/>
                        <button type="submit"><i className="ion-android-arrow-forward"></i></button>
                    </form>
                </div>
            </div>
        )
    }

}

export default PhotoPage

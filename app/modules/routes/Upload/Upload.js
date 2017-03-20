import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import { connect } from 'react-redux'
import * as axios from 'axios'
import config from 'config'
import Ink from 'react-ink'

import {
    Photo as PhotoActions,
    Photos as PhotosActions,
} from 'actions'

class Upload extends Component {

    /**
     * state
     * @type {{caption: string, hashtags: string, location: string, filename: string, uploadState: string, disabledUploadState: boolean}}
     */
    state = {
        caption: '',
        hashtags: '',
        location: '',
        filename: 'Select Image',
        uploadState: 'Upload',
        disabledUploadState: false,
    }

    /**
     * handleFileClick
     */
    handleFileClick = () => {
        document.getElementById('file').click()
    }

    /**
     * handleCaptionChange
     * @param e event
     */
    handleCaptionChange = (e) => this.setState({
        caption: e.target.value,
    })

    /**
     * handleLocationChange
     * @param e event
     */
    handleLocationChange = (e) => this.setState({
        location: e.target.value,
    })

    /**
     * handleHashtagsChange
     * @param e event
     */
    handleHashtagsChange = (e) => this.setState({
        hashtags: e.target.value,
    })

    /**
     * handleSubmit
     * @param e event
     */
    handleSubmit = (e) => {

        e.preventDefault()

        let form = document.getElementById('upload'),
            file = document.getElementById('file').files[0],
            data = new FormData()

        data.append('image', file, file.name)

        data.append('user_id', this.props.user.id)
        data.append('caption', this.state.caption)
        data.append('hashtags', this.state.hashtags)
        data.append('location', this.state.location)

        this.setState({ uploadState: 'Uploading...' })
        this.setState({ disabledUploadState: true })

        axios.post(`${config.api.baseUrl}/uploads`, data, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('jwt')}`
            },
        })
            .then(res => {
                this.props.dispatch(PhotosActions.add(res.data))
                this.setState({ uploadState: 'Success!' })
                browserHistory.push('/photos/' + res.data.id)
            })
            .catch(res => {
                this.setState({
                    uploadState: 'Error! Please click to try again.',
                    disabledUploadState: false,
                })
            })

    }

    /**
     * handleChange
     * @param e event
     */
    handleChange = (e) => {

        e.preventDefault()

        let reader = new FileReader(),
            file   = e.target.files[0]

        this.setState({ filename: file.name })

    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <form id="upload" className="upload-form" onSubmit={(e) => this.handleSubmit(e)}>
                    <div className="form-group upload" onClick={this.handleFileClick}>
                        <label htmlFor="caption">
                            <i className="ion-ios-cloud-upload-outline"></i>
                            <span id="filename">{this.state.filename}</span>
                        </label>
                        <input id="file" type="file" name="file" accept="image/*" required onChange={(e)=>this.handleChange(e)} />
                    </div>
                    <div className="inner">
                        <div className="form-group">
                            <label htmlFor="caption">Caption</label><br />
                            <input type="text" placeholder="My treehouse" name="caption" maxLength="140" value={this.state.caption} required onChange={this.handleCaptionChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="location">Location</label><br />
                            <input type="text" placeholder="City, State OR Country" name="location" value={this.state.location} required onChange={this.handleLocationChange} />
                        </div>
                        <div className="form-group">
                            <label htmlFor="hashtags">Tags</label><br />
                            <input type="text" placeholder="#cabin" name="hashtags" maxLength="140" value={this.state.hashtags} required onChange={this.handleHashtagsChange} />
                        </div>
                        <div className="form-group">
                            <button type="submit" id="upload-btn" disabled={this.state.disabledUploadState}>
                                {this.state.uploadState}
                                <Ink />
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        )
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({ user: state.User }))(Upload)

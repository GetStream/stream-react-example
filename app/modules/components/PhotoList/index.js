import React, {Component} from 'react'

import PhotoItem from './PhotoItem'

/**
 * PhotoList index component
 */
class PhotoList extends Component {

    /**
     * renderItems
     * @returns {*}
     */
    renderItems = () => {
        return this.props.photos.map(photo =>
            <PhotoItem key={`photo-${photo.id}`} {...photo} onLike={this.props.onLike} />
        )
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <ul className="photo-items">
                {this.renderItems()}
            </ul>
        )
    }
}

export PhotoFooter from './PhotoFooter'
export default PhotoList

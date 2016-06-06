import React, {Component} from 'react'
import { Link } from 'react-router'

import LikeButton from 'components/LikeButton'

/**
 * PhotoFooter component
 */
class PhotoFooter extends Component {

    static defaultProps = {
        showLike: false,
    }

    /**
     * render
     * @returns markup
     */
    render() {
        const tags = this.props.hashtags.split(' ')

        return (
            <div className="photo-item-footer">
                <div className="dash"></div>
                <h4 className="item">

                    <span className="name">{this.props.caption}</span> in
                    <Link to={`/location?q=${this.props.location}`}>&nbsp;
                        <span className="loc"><strong>{this.props.location}</strong></span>
                    </Link>


                    {this.props.showLike
                        ? <LikeButton id={this.props.id} liked={this.props.liked} onLike={this.props.onLike} />
                        : null}
                </h4>
                <ul className="hashtags">
                    {tags.map(tag =>
                        <li key={`tag-${tag}`} className="item">{tag}</li>
                    )}
                </ul>
            </div>
        )
    }

}

export default PhotoFooter

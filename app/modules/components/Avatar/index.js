import React, { Component } from 'react'

const styles = {
    root: {
        backgroundColor: '#fafafa',
        display: 'inline-block',
    }
}

/**
 * Avatar index component
 */
class Avatar extends Component {

    /**
     * defaultProps
     * @type {{email: null, height: number, imgHeight: number}}
     */
    static defaultProps = {
        email_md5: null,
        height: 155,
        imgHeight: 400,
    }

    /**
     * render
     * @returns markup
     */
    render() {

        const placeHolder = Object.assign({}, styles.root, {
            height: this.props.height,
            width: this.props.height,
        })

        if (!this.props.emailHash) return <div style={placeHolder}/>

        return <img src={`https://s.gravatar.com/avatar/${this.props.emailHash}?s=${this.props.height}`}
                    height={this.props.height} />

    }
}

export default Avatar

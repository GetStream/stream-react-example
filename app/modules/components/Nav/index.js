import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'

/**
 * Item component
 */
class Item extends Component {

    /**
     * defaultProps
     * @type {{to: string, icon: string, active: boolean}}
     */
    static defaultProps = {
        to: '',
        icon: '',
        active: false,
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <Link to={this.props.to} className={this.props.active ? 'active' : ''} style={{position: 'relative'}}>
                {this.props.icon}
            </Link>
        )
    }
}

/**
 * Nav index component
 */
class Nav extends Component {

    state = {
        unread: false,
    }

    /**
     * defaultProps
     * @type {{active: null, items: *[]}}
     */
    static defaultProps = {
        active: null,
        items: [
            {
                label: 'explore',
                icon: <img src="/img/map.svg" />,
                to: '/explore'
            },
            {
                label: 'search',
                icon: <img src="/img/search.svg" />,
                to: '/search'
            },
            {
                label: 'notifications',
                icon: props => {
                    props.unread ? document.getElementsByClassName('bell')[0].className = 'bell alert' : null
                    return (
                        <div className="bell">
                            <img src="/img/bell.svg" />
                        </div>
                    )
                },
                to: '/profile/notifications'
            },
        ]
    }

    componentDidUpdate(oldProps) {
        if (this.props.stream != oldProps.stream) {
            this.setState({ unread: this.props.stream !== 0, })
        }
    }

    /**
     * render
     * @returns markup
     */
    render() {

        let activeIndex
        this.props.items.forEach((item, i) => {
            if (item.label == this.props.active) activeIndex = i
        })

        const indicator = {
            width: (100 / this.props.items.length) + '%',
            left: (100 / this.props.items.length) * activeIndex + '%'
        }

        return (
            <div className="item middle">
                <nav>
                    {this.props.items.map((item, i) => {

                        const newItem = {...item}

                        if (typeof item.icon == 'function')
                            newItem.icon = item.icon({ unread: this.state.unread })

                        newItem.active = false
                        if (newItem.label === this.props.active) newItem.active = true
                        return <Item key={`nav-item-${newItem.label}`} {...newItem} />
                    })}
                </nav>
                {this.props.active !== null
                    ? <div className="indicator" style={indicator}/>
                    : null}
            </div>
        )
    }
}

export default connect(state => ({ stream: state.Stream }))(Nav)

import React, { Component } from 'react'

require('./styles.css')

/**
 * Tab component
 */
export class Tab extends Component {

    /**
     * defaultProps
     * @type {{active: boolean}}
     */
    static defaultProps = {
        active: false,
    }

    /**
     * render
     * @returns markup or {null}
     */
    render() {
        return this.props.active ? this.props.children : null
    }
}

/**
 * Tabs index component
 */
export class Tabs extends Component {

    /**
     * state
     * @type {{active: number}}
     */
    state = {
        active: 0,
    }

    /**
     * handleClick
     * @param e
     * @param i
     * @param items
     */
    handleClick = (e, i, items) => {
        this.setState({
            active: i,
        })
    }

    /**
     * render
     * @returns markup
     */
    render() {

        const indicator = {
            left: (100 / 4) * this.state.active + '%',
            width: (100 / 4) + '%',
        }

        const children = React.Children.toArray(this.props.children)

        const items = children.map((c, i) => {
            return React.cloneElement(c, {
                active: i == this.state.active
            })
        })

        return (
            <div className={this.props.className || ''}>
                <header>
                    <div className="items">
                        {children.map((tab, i) => {
                            const active = (this.state.active == i)
                            return (
                                <button
                                    key={`tab-button-${i}`}
                                    onClick={e => this.handleClick(e, i, children)}
                                    className={active ? 'active' : ''}>{tab.props.label}</button>
                            )
                        })}
                    </div>
                    <div className="indicator" style={indicator}/>
                </header>

                {items.filter(item => item.props.active)[0]}

            </div>
        )
    }
}

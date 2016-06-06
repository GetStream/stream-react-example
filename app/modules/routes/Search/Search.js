import React, { Component } from 'react'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import { findDOMNode } from 'react-dom'
import config from 'config'

import {
    Filters,
} from './components'

import {
    Search as SearchActions,
} from 'actions'

/**
 * Search
 * '/search'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Search extends Component {

    /**
     * state
     * @type {{value: string, active: boolean}}
     */
    state = {
        value: '',
        active: false,
    }

    /**
     * componentDidMount
     */
    componentDidMount() {
        findDOMNode(this._searchField).focus()
        this.props.dispatch(SearchActions.recent())
    }

    /**
     * componentDidUpdate
     * @param oldProps
     */
    componentDidUpdate(oldProps) {
        if (this.props.search.active != oldProps.search.active) {
            browserHistory.push(`/search-results?q=${encodeURIComponent(this.props.search.active.word)}&type=${this.props.search.active.type}`)
        }
    }

    /**
     * handleSearchChange
     * @param e event
     */
    handleSearchChange = (e) => {

        this.setState({
            value: e.target.value,
        })

        if (this.$i) clearTimeout(this.$i)

        this.$i = setTimeout(() => {

            if (this.state.value == '') {
                this.setState({ active: false })
                return
            }

            this.setState({ active: true })
            this.props.dispatch(SearchActions.search(this.state.value, 'all'))

        }, 200)
    }

    /**
     * handleSubmit
     * @param e event
     */
    handleSubmit = (e) => {
        e.preventDefault()

        this.setState({
            active: e.target.value == '' ? false : true,
        })

        this.props.dispatch(SearchActions.search(this.state.value, 'all'))
    }

    /**
     * handleFilterClick
     * @param e
     * @param i
     * @param result
     */
    handleFilterClick = (e, i, result) => {

        let r = result
        if (typeof result == 'string') {

            r = {}
            if (result.indexOf('#') >= 0) {
                r.type = 'hashtags'
                r.word = result.replace('#', '')
            }

            if (!r.type) {
                r.type = 'location'
                r.word = result
            }

        } else {
            if (result.type == 'user') {
                r.type = 'user'
                r.word = result.word.name
            }
        }

        if (r.type == 'hashtags') r.word = `#${r.word}`

        this.props.dispatch(SearchActions.trigger(r))
    }

    /**
     * renderActiveMode
     * @returns markup
     */
    renderActiveMode = () => {
        if (!this.state.active) return
        return (
            <Filters
                onClick={this.handleFilterClick}
                results={this.props.search.hits}
                total={this.props.search.total}
                term={this.props.search.term}/>
        )
    }

    /**
     * renderIdleMode
     * @returns markup
     */
    renderIdleMode = () => {
        if (this.state.active) return

        return (
            <div className="history">
                <ul>
                    {this.props.search.recent.map((r, i) =>
                        <li key={`search-history-${r.search}`}
                            onClick={(e) => this.handleFilterClick(e, i, r.search)}>{r.search}</li>)}
                </ul>
            </div>
        )
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <div className="search">
                    <h1>Discover</h1>
                    <form onSubmit={(e) => this.handleSubmit(e)}>
                        <input type="text" ref={c => this._searchField = c} placeholder="Search" maxLength="40" required
                               onChange={this.handleSearchChange} />
                        <button type="submit">
                            <i className="ion-search"></i>
                        </button>
                    </form>
                    {this.renderActiveMode()}
                    {this.renderIdleMode()}
                </div>
            </div>
        )
    }

}

/**
 * connect
 * Connects React component to a Redux store
 * Documentation: https://github.com/reactjs/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options
 */
export default connect(state => ({search: state.Search,}))(Search)

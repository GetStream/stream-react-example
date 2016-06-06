import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import numeral from 'numeral'

import {
    Tab,
    Tabs,
    Avatar,
} from 'components'

/**
 * Filters component used by Search route
 */
class Filters extends Component {

    /**
     * defaultProps
     * @type {{onClick: Filters.defaultProps.onClick, results: Array}}
     */
    static defaultProps = {
        onClick: () => {},
        results: [],
    }

    /**
     * renderResults
     * @param fn
     * @param comp
     * @returns {*}
     */
    renderResults = (fn, comp) => {
        const items = fn ? this.props.results.filter(fn) : this.props.results
        if (!items.length) return <div className="no-results">No results found</div>
        return items.map(comp)
    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <Tabs className="tabs">
                <Tab key="filter-all" label="All">
                    <div className="results">
                        <ul>
                            {this.renderResults(
                                null,
                                (r, i) => {

                                    switch (r.type) {
                                        case 'hashtags':
                                            return <li key={`result-hashtags-${r.word}`}
                                                       onClick={(e) => this.props.onClick(e, i, r)}>
                                                <div className="result-inner">
                                                    <strong>#{r.word}</strong>
                                                    <span>{numeral(r.count).format('0,0')} {r.count > 1 ? 'Photos' : 'Photo'}</span>
                                                </div>
                                            </li>

                                        case 'location':
                                            return <li key={`result-location-${r.word}`}
                                                       onClick={(e) => this.props.onClick(e, i, r)}>{r.word}</li>

                                        case 'user':
                                            return (
                                                <li key={`result-user-${r.word.email}`}
                                                    onClick={(e) => browserHistory.push(`/profile/${r.word.id}`)}>
                                                    <div className="result-inner result-user">
                                                        <Avatar emailHash={r.word.email} height={50}/>
                                                        <span>{r.word.name}</span>
                                                    </div>
                                                </li>
                                            )
                                    }

                                })}
                        </ul>
                    </div>
                </Tab>

                <Tab key="filter-users" label="Users">
                    <div className="results">
                        <ul>
                            {this.renderResults(
                                r => r.type == 'user',
                                (r, i) => (
                                    <li key={`result-user-${r.word.email}`}
                                        onClick={(e) => browserHistory.push(`/profile/${r.word.id}`)}>
                                        <div className="result-inner result-user">
                                            <Avatar emailHash={r.word.email} height={50}/> <span>{r.word.name}</span>
                                        </div>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>
                </Tab>

                <Tab key="filter-locations" label="Location">
                    <div className="results">
                        <ul>
                            {this.renderResults(
                                r => r.type == 'location',
                                (r, i) => (
                                    <li key={`result-location-${r.word}`}
                                        onClick={(e) => this.props.onClick(e, i, r)}>{r.word}</li>
                                ))}
                        </ul>
                    </div>
                </Tab>

                <Tab key="filter-tags" label="Tags">
                    <div className="results">
                        <ul>
                            {this.renderResults(
                                r => r.type == 'hashtags',
                                (r, i) => (
                                    <li key={`result-hashtags-${r.word}`} onClick={(e) => this.props.onClick(e, i, r)}>
                                        <div className="result-inner">
                                            <strong>#{r.word}</strong>
                                            <span>{numeral(r.count).format('0,0')} Photos</span>
                                        </div>
                                    </li>
                                ))}
                        </ul>
                    </div>
                </Tab>
            </Tabs>
        )
    }
}

export default Filters

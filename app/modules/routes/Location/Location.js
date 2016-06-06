import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router'
import config from 'config'

import {
    Location as LocationActions,
} from 'actions'

/**
 * Location
 * '/location'
 * React Route - Documentation: https://github.com/reactjs/react-router/tree/master/docs
 */
class Location extends Component {

    /**
     * state
     * @type {{location: string}}
     */
    state = {
        location: '',
    }

    /**
     * componentDidUpdate
     * @param oldProps
     */
    componentDidUpdate = (oldProps) => {

        let loc  = this.props.loc[0],
            lat  = loc.latitude,
            lng  = loc.longitude,
            name = loc.location;

        if (location !== '') {
            this.loadMapboxMap(lng, lat, name)
        }
    }

    /**
     * componentDidMount
     */
    componentDidMount = () => {

        let loc = this.props.location.query.q

        this.setState({ location: loc })
        this.props.dispatch(LocationActions.load(loc))

    }

    /**
     * loadMapboxMap
     * @param lng {Number}
     * @param lat {Number}
     * @param name {String}
     */
    loadMapboxMap = (lng, lat, name) => {

        mapboxgl.accessToken = config.mapbox.accessToken
        let map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/nickatstream/cinj7vvpf000ib7mbzpyhkw38',
            center: [lng, lat],
            zoom: 9,
        })

        map.on('load', function () {
            map.addSource('markers', {
                type: 'geojson',
                data: {
                    type: 'FeatureCollection',
                    features: [{
                        type: 'Feature',
                        geometry: {
                            type: 'Point',
                            coordinates: [lng, lat]
                        },
                        properties: {
                            title: name,
                            'marker-symbol': 'default_marker'
                        }
                    }]
                }
            })

            map.addLayer({
                id: 'markers',
                type: 'symbol',
                source: 'markers',
                layout: {
                    'icon-image': 'default_marker',
                    'text-field': name,
                    'text-font': ['Open Sans Semibold', 'Arial Unicode MS Bold'],
                    'text-offset': [0, 0.6],
                    'text-anchor': 'top'
                }
            })
        })

    }

    /**
     * render
     * @returns markup
     */
    render() {
        return (
            <div className="page">
                <div className="location">
                    <div className="map" id="map"></div>
                    <div className="images">
                        <h1>{this.state.location}</h1>
                        <div className="grid">
                            {this.props.loc.map(item =>
                                <div className="grid-cell" key={`location-${item.id}`}>
                                    <Link to={`/photos/${item.id}`}>
                                        <img src={`${config.imgix.baseUrl}/${item.filename}?auto=enhance&w=200&h=200&fit=crop&fm=png&dpr=2`}/>
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
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
export default connect(state => ({
    loc: state.Location,
}))(Location)

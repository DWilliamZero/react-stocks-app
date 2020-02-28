import React from 'react';
import Axios from 'axios';

const MAPBOX_TOKEN = process.env.REACT_APP_MAPBOX_TOKEN;
const MAPBOX_URL = process.env.REACT_APP_MAPBOX_URL;
const MAPBOX_STATIC_MAP = process.env.REACT_APP_MAPBOX_STATIC_MAP

class Maps extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      lat: 0,
      long: 0
    }
  }

  geoLocate = async () => {
    try {
      const rawZip = this.props.zip;
      const zip = rawZip.substring(0, 5);
      const results = await Axios.get(
        `${MAPBOX_URL}${this.props.city}%2C%20${this.props.state}%20${zip}.json?types=address&access_token=${MAPBOX_TOKEN}`
      )
      console.log('Lat:', results.data.features[0].center[1], 'Long:', results.data.features[0].center[0])
      console.log(zip)
      this.setState({
        lat: results.data.features[0].center[1],
        long: results.data.features[0].center[0]
      })
    } catch (error) {
      console.error(error)
    }
  }

  componentDidMount() {
    this.geoLocate()
  }

  componentWillReceiveProps() {
    this.geoLocate()
  }

  render() {
    return (
      <div className='map-card'>
        <img className='img-map' src={`${MAPBOX_STATIC_MAP}${this.state.long},${this.state.lat},16.0/1280x1280?access_token=${MAPBOX_TOKEN}`} alt='map' />
        <p>{`${this.props.address}, ${this.props.city}, ${this.props.state} ${this.props.zip}`}</p>
      </div >
    );
  }
}

export default Maps;
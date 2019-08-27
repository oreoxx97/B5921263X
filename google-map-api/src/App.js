import React , {Component} from 'react';

import './App.css';
import Mapview from './component/mapview';
import {
  withGoogleMap,
  withScriptjs,
  GoogleMap,
  Marker,
  InfoWindow
} from "react-google-maps";

export default class  App extends Component {
  

  render(){

    const MapWrapped = withScriptjs(withGoogleMap(Mapview));
    const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
    return (
      <div className="App">
        <div style={{ width: "100vw", height: "100vh" }}>
      <MapWrapped
        googleMapURL={url}
        loadingElement={<div style={{ height: `100%` }} />}
        containerElement={<div style={{ height: `100%` }} />}
        mapElement={<div style={{ height: `100%` }} />}
      />
    </div>
      </div>
    );
  }
  
}



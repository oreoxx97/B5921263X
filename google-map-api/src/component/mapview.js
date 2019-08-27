import React, { Component } from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";

export default  class mapview extends Component {    
    render() {
        const mapStyles = {
            width: '100%',
            height: '100%', 
          };
        return (
            <GoogleMap
            defaultZoom={10}
            defaultCenter={{ lat: 45.4211, lng: -75.6903 }}
            defaultOptions={{ styles: mapStyles }}
          >
           
          </GoogleMap>
        )
    }
}

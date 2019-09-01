import React, { Component, useState } from 'react'
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";





function degreesToRadians(degrees) {
    return degrees * Math.PI / 180;
}

export default class mapview extends Component {



    constructor(props) {
        super(props);
        this.state = {
            data: [],
            position: null,
            showInfoIndex: null,
        };
    }


    componentDidMount() {
        console.log('componentDidMount')
        var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${this.props.lat},${this.props.lng}&radius=${this.props.radius}&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
        var dataArray = []
        var proxy_url = 'https://cors-anywhere.herokuapp.com/';

        fetch(`${proxy_url}${url}`)
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach(x => {
                    dataArray.push(x)
                });
                this.setState({ data: dataArray })
            }
            );




    }

    handleToggleOpen(i) {
        this.setState({ showInfoIndex: i })
    }



    handleToggleClose = () => {
        this.setState({
            showInfoIndex: null
        });

    }


    calculateDistance(lat1, lon1, lat2, lon2, i) {

        //  console.log(lat1 , lon1 , lat2 , lon2)
        var earthRadiusKm = 6371;
        var dLat = degreesToRadians(lat2 - lat1);
        var dLon = degreesToRadians(lon2 - lon1);
        //console.log(dLat,dLon)
        lat1 = degreesToRadians(lat1);
        lat2 = degreesToRadians(lat2);

        // console.log(lat1,lat2)
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = earthRadiusKm * c;
        var x = Number(d.toFixed(2));

        if (x == 0) {
            x = Number(d.toFixed(3));;

        }
        return x;


    }

    insertdata() {
        console.log("x")
        if (this.state.data.length != 0) {
            console.log("render", this.props.data)

            if (this.props.idmember !== "new") {
                const data = {}
                const array = []
                var distance = 0;
                var name = '';
                this.props.data.map((x, i) => {
                    name = String(x.name)
                    distance = this.calculateDistance(Number(this.props.lat), Number(this.props.lng), x.geometry.location.lat, x.geometry.location.lng)
                    data[i] = { name, distance }
                    console.log(data[i])
                    fetch(`http://localhost:8080/api/insertx/${this.props.idmember}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data[i]),
                    });
                    array.push(data[i])
                })

            }



        }

    }


    selectListshowMap() {
        if (this.props.selectLat != 0) {
            var x = []
            console.log(this.state.data[this.props.numberx])
            {
                x = this.state.data[this.props.numberx]
                console.log(x)
            }

            return (<Marker
                position={{
                    lat: this.props.selectLat,
                    lng: this.props.selectLng
                }}
            >
                <InfoWindow
                >
                    <h1 style={{ fontSize: "12px" }}> {this.props.nameselect} </h1>
                </InfoWindow>

            </Marker>)
        }

    }



    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
        console.log(this.props.selectLat)


        if (this.props.input == true) {
            this.insertdata()
        }

        //  console.log("Mark", this.state.mark)
        if (this.props.selecta == false) {
            this.selectListshowMap();
        }

        var im = 'https://sv1.picz.in.th/images/2019/08/31/ZA9npP.png'

        console.log("Mapview", this.state.data)
        console.log(this.props.input)
        console.log(this.props.idmember)
        console.log(this.props.numberx)
        console.log(this.props.selecta)
        console.log(this.props.nameselect)
        return (
            <div>
                <GoogleMap
                    defaultZoom={this.props.zoom}
                    defaultCenter={{ lat: this.props.lat, lng: this.props.lng }}
                    defaultOptions={{ styles: mapStyles }}

                >
                    <Marker
                        position={{
                            lat: this.props.lat,
                            lng: this.props.lng
                        }}

                        icon={im}

                    >

                        {this.selectListshowMap()}


                    </Marker>


                    {this.state.data.map((park, i) => (

                        <Marker

                            key={i}
                            position={{
                                lat: park.geometry.location.lat,
                                lng: park.geometry.location.lng

                            }}



                            onClick={() => this.handleToggleOpen(i)}


                        >
                            {(this.state.showInfoIndex == i) &&
                                <InfoWindow
                                    onCloseClick={this.handleToggleClose}

                                >
                                    <h1 style={{ fontSize: "12px" }}> {park.name} </h1>
                                </InfoWindow>


                            }
                        </Marker>
                    ))}
                </GoogleMap>
            </div>
        )


    }
}

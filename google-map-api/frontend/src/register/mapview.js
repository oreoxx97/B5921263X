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
            insert : false,
          
        };
    }


    componentDidMount() {//ดึงข้อมูลเพื่อไปแสดงผล มาร์ค บนแผลที่
        console.log('componentDidMount')
        var url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(this.props.lat)},${Number(this.props.lng)}&radius=${Number(this.props.radius)}&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
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

            if(this.props.checkinput == false){
                this.setState({insert : true})
            }
    }


  
    handleToggleOpen(i) { //เช็คการคลิกมาร์คบนแผนที่
        this.setState({ showInfoIndex: i })
    }



    handleToggleClose = () => { //เมื่อคลิกปิดรายการแสดงบนมาร์ค จะทำการเซ็ตค่าใหม่
        this.setState({
            showInfoIndex: null
        });



    }
  

    calculateDistance(lat1, lon1, lat2, lon2, i) {//ทำการคำนวณเพื่อนำไปบันทึกข้อมูลให้กับผู้ใช้

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

    insertdata() { //บันทึกข้อมูลที่ผู้ใช้ค้นหา 
        //console.log("x")
         if (this.state.data.length != 0) {//เช็คว่ามีข้อมูลที่เราค้นหาหรือไม้
             // console.log("insertdata", this.props.data)
             if(this.props.selectLat == undefined){
            if (this.props.idmember !== "new") {//เช็คว่าเมื่อกดค้นหาเเล้ว จะเป็นผู้ใช้หรือไม่
                //console.log(this.props.lat,this.props.lng,this.props.radius)
                var latitude = Number(this.props.lat);
                var longitude = Number(this.props.lng)
                var radius = Number(this.props.radius)
                var data = {}
                data = {longitude ,latitude ,radius }
                //console.log(data)
                    fetch(`http://localhost:8080/api/insertx/${this.props.idmember}`, {
                        method: 'POST',
                        headers: {
                            'Accept': 'application/json',
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify(data),
                    });
              

           }
        }
         }
    }


    selectListshowMap() {//แสดงผล จากการเลือกรายการใน listview ของผู้ใช้
        if (this.props.selectLat != 0) {//เช็คว่าผู้ใช้ได้ทำการเลือกรายการหรือไม่
            if(this.props.selectLat != undefined){
                return (
                    <Marker
                        position={{
                            lat: Number(this.props.selectLat),
                            lng: Number(this.props.selectLng)
                        }}
                    >
                        <InfoWindow
                           
                        >
                            <h1 style={{ fontSize: "12px" }}> {this.props.nameselect} </h1>
                        </InfoWindow>

                    </Marker>
                    )
            }
                
        }

    }



    render() {
        const mapStyles = {
            width: '100%',
            height: '100%',
        };
       

        
        console.log("this.state.check", this.state.check)
        console.log("this.state.number", this.state.number)

        if (this.state.insert == true) {//เช็คว่าผู้ใช้ได้กดค้นหาหรือไม่
            this.insertdata()
        }

        var im = 'https://sv1.picz.in.th/images/2019/08/31/ZA9npP.png'

        console.log("Mapview", this.state.data)
         console.log(this.props.selectLat)
       //  console.log(this.props.input)
        // console.log(this.props.idmember)
        // console.log(this.props.numberx)
        // console.log(this.props.selecta) 
        console.log(this.state.insert)
       // console.log(this.props.checkinput)
        // console.log(this.props.nameselect)
        // console.log(this.props.isOpen)
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
                    </Marker>

                    {this.selectListshowMap()}

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

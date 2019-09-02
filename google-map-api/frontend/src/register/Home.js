import React, { Component } from 'react'
import '../App.css';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import InputLabel from '@material-ui/core/InputLabel';


import Mapview from './mapview';

import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
} from "react-google-maps";



function degreesToRadians(degrees) { //function คำนวณระยะทางจากจุด 2 จุด (calculate distance GPS 2 point)
    return degrees * Math.PI / 180;
}

export default class Home extends Component {
    emptyItem = {
        lat: 18.7717874,
        lng: 98.9742796,
        radius: 10,
        zoom: 13.5
    };//set เป็นค่า default / set is the default

    emptyMember = {
        username: '',
        password: '',
        idcard: '',
        firstname: '',
        lastname: '',
        email: '',
        birthday: ''
    } //เก็บข้อมูล user  ที่ login เข้ามา /Stores the user information that is logged in.

    item={
         latselectx:0,
         lngselectx:0,
         name:''
    }//เก็บค่าที่เรา click ตรง listview  เพื่อส่งไปแสดงแผลบน google map /Collect the value that we click on the listview to send to show on google map.
   
    constructor(props) {
        super(props);
        this.state = {
            latx: 18.7717874,
            lngx: 98.9742796,
            radiusx: 10,
            zoomx: 13.5,
            setItem: this.emptyItem,
            datalist: [],
            isOpen: false,
            changelat: false,
            changelng: false,
            input: false,
            member: this.emptyMember,
            id:[],
            select :false,
            selectlist :this.item,
            numberx:null,
            checkinput : true,
           
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    async componentDidMount() {// ดึงข้อมูลจาก ค่า  default ที่เรา set ไว้ /Retrieve data from the default we set
        console.log('  componentDidMount Check DATA LIST')
        var urlx = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(this.state.latx)},${Number(this.state.lngx)}&radius=${Number(this.state.radiusx)}&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
        var dataArray = []
        var proxy_url = 'https://cors-anywhere.herokuapp.com/';

        fetch(`${proxy_url}${urlx}`)
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach(x => {
                    dataArray.push(x)
                });
                this.setState({ datalist: dataArray })
            }
            );

        if (this.props.match.params.id !== 'new') { //เช็คว่ามีการ เข้าสู่ระบบเข้ามาหรือไม่  ถ้า ใช่จะทำการดึงข้อมูลผู้ใช้ จากฐานข้อมูล
            const member = await (await fetch(`http://localhost:8080/api/findMember/${this.props.match.params.id}`)).json();
            this.setState({ member: member });
            this.setState({ memberSet: true })
        }
       
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const item = { ...this.state.setItem };
        item[name] = value;
        this.setState({ setItem: item });
        if (item.lat != 18.7717874) {
            this.setState({ changelat: true })
        }
        if (item.lng != 98.9742796) {
            this.setState({ changelng: true })
        }

        if(this.state.checkinput == false){
            this.setState({checkinput : true})
        }

    }


    handleSubmit(event) {
        event.preventDefault();
        const { setItem, changelat, changelng } = this.state;
        const Checklat = setItem.lat
        const Checklng = setItem.lng
        var lat = false;
        var lng = false;
        var radius = false;

        //เช็คว่ามีการเปลี่ยนแปลงค่าลองจิจูด ละติจูดและรัศมีหรือไม่
        if (changelat == true) { 
            if (Checklat.match(/^[0-9]*\.[0-9]*/) != null) {
                this.setState({ latx: setItem.lat })
                lat = true;
            }
        }
        if (changelng == true) {
            if (Checklng.match(/^[0-9]*\.[0-9]*/)) {
                this.setState({ lngx: setItem.lng })
                lng = true;
            }
                
        }
        if (1 <= Number(setItem.radius) && Number(setItem.radius) <= 50000) {
            this.setState({ radiusx: setItem.radius })
            console.log("radius")
            radius = true;
            
        }

        var latselectx = 0
        console.log(lat,lng ,radius)
        //ถ้ามีการเปลี่ยนแปลงจะทำการค้นหาตามค่าที่ผู้ใช้กรอก
        // if(lat == true && lng == true && radius == true){
          
           
          
           
            this.setState({ isOpen: true })
            this.setState({ selectlist : 0})
            this.setState({ checkinput : false})
            
       //  }else{
       //      alert("กรุณากรอกข้อมูลใหม่ให้ถูกต้องและครบถ้วน")
       // }
        

        console.log("SUBMIT", this.state.isOpen)
    
}

    calculateDistance(lat1, lon1, lat2, lon2, i) { //การคำนวณหาระยะระหว่างจุด 2 จุด
       
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

        if (x == 0) { //ถ้าทศนิยม 2 ตำแหน่งเเล้วได้ค่า 0 จะทำการเลื่อนตำแหน่งจุดทศนิยให้อีก 1 ตำแหน่ง
            x = Number(d.toFixed(3));;

        }
        return x;


    }

    setDatalist() { //การดึงข้อมูลเพื่อเอาไปโชว์ใน Listview
        console.log('xx')
        const { setItem, radiusx , latx , lngx} = this.state;
        console.log('Check DATA LIST')
       

        var urlx = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${Number(latx)},${Number(lngx)}&radius=${Number(radiusx)}&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
        var dataArray = []
        var proxy_url = 'https://cors-anywhere.herokuapp.com/';
        fetch(`${proxy_url}${urlx}`)
            .then((response) => response.json())
            .then((data) => {
                data.results.forEach(x => {
                    dataArray.push(x)
                });
                this.setState({ datalist: dataArray })
            }
            );
            console.log("dataArray",dataArray)
        this.setState({ isOpen: false })
        this.setState({ input: true })
        

        //เช็ครัศมี เพื่อทำการขยายออกสำหรับรัศมีที่กว้าง หรือย่อเข้าสำหรับรัศมีที่เล็ก
        if (Number(radiusx) < 5000) {
            this.setState({ zoomx: 13.5 })
        }
        else if (5000 <= Number(radiusx) && Number(radiusx) < 20000) {
           
            this.setState({ zoomx: 13 })
        }
        else if (20000 <= Number(radiusx) && Number(radiusx) < 30000) {
            
            this.setState({ zoomx: 12 })
        }
        else if (30000 <= Number(radiusx)) {
            this.setState({ zoomx: 11 })
        }
    }

   
    
    selectList(e) {//ผู้ใช้คลิกตรง listview จะทำการเก็บข้อมูล
        var number =0;
        const {id,numberx}=this.state
      
        // console.log(e.currentTarget.dataset.id)
        number = Number(e.currentTarget.dataset.id);
        //console.log(number)
        this.setState({ id : this.state.datalist[number]})
        this.setState({select : true})
        this.setState({numberx : number})
        //console.log(id)

    }

    setLATandLNG(latselectx , lngselectx , name){//ข้อมูลจากการเลือก listview จะถูกส่งไปแสดงผลบนแผนที่
        //console.log('a' , latselectx , lngselectx)
        var array = []
        array = { latselectx , lngselectx , name }
        //console.log(array)
        this.setState({selectlist : array})
        this.setState({select : false})
    }
    
   


    render() {

        const MapWrapped = withScriptjs(withGoogleMap(Mapview));
        const url = `https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyB6Q90sn5X-YQ6yZo5WlSSDuD8xfMMazuE`
        const { setItem, latx, lngx, radiusx, zoomx, datalist, member,  input ,id ,selectlist ,numberx ,isOpen}  = this.state;
        

        console.log("render", this.state.isOpen)
         if (this.state.isOpen == true) {//เมื่อทำการค้นหาข้อมูลจะถูกส่งเข้าไปค้นหารายการเพื่อนำมาแสดงผลใน listview
             this.setDatalist()
         }
        
        
         
         console.log("select", this.state.select)
      
         if(this.state.select == true){//เมื่อเราเลือกรายการใน listview จะนำข้อมูลที่ได้ไปเก็บไว้สำหรับการส่งไปแสดงผลบนแผนที่
            //console.log("id",id)
            //console.log(id.geometry.location.lat ,id.geometry.location.lng )
            const latselectx = Number(id.geometry.location.lat);
            const lngselectx = Number(id.geometry.location.lng);
            const name = String(id.name)
           // console.log("Select" , latselectx , lngselectx ,name)
            this.setLATandLNG(latselectx , lngselectx ,name);
         }
         

        
        const lat = Number(latx);
        const lng = Number(lngx);
        const radius = Number(radiusx)
        const zoom = Number(zoomx)
        
      


        
        console.log("selectlist", selectlist , numberx)
        console.log("DataList", datalist)

        
        const selectLat = selectlist.latselectx;
        const selectLng = selectlist.lngselectx
        const nameselect = selectlist.name
       // console.log(selectLat,selectLng,nameselect)
        
    return (
            <div className="div">
                <Form onSubmit={this.handleSubmit}>
                    <div className="row , bar" >
                        <FormGroup style={{ margin: "10px" }}>
                            <Input type="number" name="lat" id="lat" value={setItem.lat || ''}
                                onChange={this.handleChange}
                                autoComplete="lat" placeholder="ละติจูด"
                            />
                            <InputLabel shrink htmlFor="bootstrap-input">Latitude</InputLabel>
                        </FormGroup>
                        <FormGroup style={{ margin: "10px" }} >
                            <Input type="number" name="lng" id="lng" value={setItem.lng || ''}
                                onChange={this.handleChange}
                                autoComplete="lng" placeholder="ลองติจูด"
                            />
                            <InputLabel shrink htmlFor="bootstrap-input">Longitude</InputLabel>
                        </FormGroup>
                        <FormGroup style={{ margin: "10px" }}>
                            <Input type="number" name="radius" id="radius" value={setItem.radius || ''}
                                onChange={this.handleChange}
                                autoComplete="radius" placeholder="รัศมี" />
                            <InputLabel shrink htmlFor="bootstrap-input">Radius ( 1-50000 meter)</InputLabel>
                        </FormGroup>
                        <FormGroup style={{ margin: "10px" }}>
                            <Button color="warning" type="submit">ค้นหา</Button>
                        </FormGroup>
                        <form style={{ justifyContent: 'right', alignItems: 'right', paddingLeft: '360pt' }}>
                            <span className="showusername">{member.username}</span>
                            <FormGroup style={{ margin: "5px" }}>
                                <Button color="danger" type="submit" tag={Link} to={"/"}>ออกจากระบบ</Button>
                            </FormGroup>
                        </form>
                    </div>
                </Form>
                <div className="map">
                    <MapWrapped
                        googleMapURL={url}
                        loadingElement={<div style={{ height: `100%` }} />}
                        containerElement={<div style={{ height: `100%` }} />}
                        mapElement={<div style={{ height: `100%` }} />}
                        lat={lat} lng={lng} radius={radius} zoom={zoom}
                        data={datalist} input={input} idmember={this.props.match.params.id}
                        selectLat={selectLat} selectLng={selectLng} numberx={numberx} selecta={this.state.select}
                        nameselect={nameselect} isOpen={isOpen} checkinput={this.state.checkinput}
                    >
                    </MapWrapped>
                </div>
                <div id="container" >
                    <div id="textareacontainer">

                        <ul className="demo">
                            <div>
                                {
                                    this.state.datalist.map((park, i) => (
                                        <li className="cardlist" onClick={this.selectList.bind(this)} data-id={i} key={park.id}>
                                            <div className="fronts">
                                                <span key={park.id}>{i + 1}. </span>
                                                {park.name}
                                            </div>
                                            <div className="front">
                                                <span>ระยะทางจากจุดค้นหา</span>
                                                : {this.calculateDistance(Number(setItem.lat), Number(setItem.lng), park.geometry.location.lat, park.geometry.location.lng)}
                                                <span> KM</span>

                                            </div>
                                        </li>
                                    ))
                                }
                            </div>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}



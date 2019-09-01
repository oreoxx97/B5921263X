import React, { Component } from 'react'
import '../../App.css';
import { Link } from 'react-router-dom';
import { Button, Container, Form, FormGroup, Input, Label } from 'reactstrap';
import Select from '@material-ui/core/Select';
import 'bootstrap/dist/css/bootstrap.min.css';
import MenuItem from '@material-ui/core/MenuItem';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';


const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
}));


export default class Member extends Component {



    emptyMember = {
        username: '',
        password: '',
        idcard: '',
        firstname: '',
        lastname: '',
        email: '',
        birthday: ''
    }

    item = {
        username: '',
        password: '',
    }


    constructor(props) {
        super(props);
        this.state = {
            memberSet:this.item,
            member: this.emptyMember
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }



    componentDidMount() {
        fetch('http://localhost:8080/api/members')
            .then(response => response.json())
            .then(data => this.setState({ memberSet: data }));

    }
    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const item = { ...this.state.member };
        item[name] = value;
        this.setState({ member: item });
        console.log(this.state.member);
    }





    async handleSubmit(event) {
        event.preventDefault();
        const { memberSet, member } = this.state;
        console.log(memberSet, member)
        const username = member.username
        const password = member.password
        const idcard = member.idcard
        const firstname = member.firstname
        const lastname = member.lastname
        const email = member.email
        const birthday = member.birthday
        console.log(username,password,idcard,firstname,lastname,email,birthday)
        console.log(username.match(/^[A-Z0-9a-z]{5,8}$/))
        console.log(password.match(/^[A-Z0-9a-z]{5,8}$/))
        console.log(firstname.match(/\w*[^0-9!@#$%&*()_+="'.?/\-;:{} ก-๙]/))
        console.log(lastname.match(/\w*[^!@#$%&*()_+="'.?/\-;:{} ก-๙]/))
        console.log(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/))
        console.log(idcard.match(/^[0-9]{13}$/))
        const checkfirstname = firstname.match(/\w*[^0-9!@#$%&*()_+="'.?/\-;:{} ก-๙]/)
        const checklastname = lastname.match(/\w*[^0-9!@#$%&*()_+="'.?/\-;:{} ก-๙]/)
       
        if(username.match(/^[A-Z0-9a-z]{5,8}$/) != null){
            var user = true;
            memberSet.forEach(x =>{
                if(username == x.username){
                    user = false;
                    alert("Username นี้มีผู้ใช้เเล้ว")
                    console.log('y')
                  return
                }
             })
           
    }else{
        alert("กรุณากรอก Username")
    }



    if(user == true){
        alert("Username ถูกต้อง")
        
    }

        var first = false;
        var last = false;
        var mail = false;
        var pass = false;
        var card = false;
        if(firstname.match(/\w*[^0-9!@#$%&*()_+="'.?/\-;:{} ก-๙]/) != null){
            if(firstname == checkfirstname[0]){
                 first = true;
                console.log('f',first)
            }
        }
        if(lastname.match(/\w*[^0-9!@#$%&*()_+="'.?/\-;:{} ก-๙]/) != null){
            if(lastname == checklastname[0]){
                 last = true;
                console.log('l',last)
            }
        }
        if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/) != null){
            mail = true;
            console.log("m",mail)
        }
        if(password.match(/^[A-Z0-9a-z]{5,8}$/) != null){
            pass = true
        }
        if(idcard.match(/^[0-9]{13}$/) != null){
            card = true
        }
      
        

        if(user == true && first == true && last == true && mail == true && pass == true && card == true){
             await fetch(`http://localhost:8080/api/memberx`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(member),
        });this.props.history.push('/');
        }else{
            alert('ข้อมูลบางส่วนไม่ถูกต้อง')
        }

    }
   



    render() {
        console.log(this.state.memberSet)
        const { memberSet, member } = this.state;


        return (
            <div className="member">
                <Container style={{ paddingTop: '0px' }}>
                    <Form onSubmit={this.handleSubmit}>
                        <from>
                            <fieldset className='my-fieldset'>
                                <legend className='login-legend' >Personalia:</legend>
                                <div className="row" >
                                    <FormGroup className="col-md-3 mb-3" className='FormGroup'>
                                        <Label for="username" className='colors'>Username</Label>
                                        <Input type="text" name="username" id="username" value={member.username || ''}
                                            onChange={this.handleChange}
                                            autoComplete="username" placeholder="username" />
                                             <InputLabel shrink htmlFor="bootstrap-input">character and number (5-8) </InputLabel>
                                    </FormGroup>
                                    <FormGroup className='FormGroup'>
                                        <Label for="password" className='colors' >Password</Label>
                                        <Input type="text" name="password" id="password" value={member.password || ''}
                                            onChange={this.handleChange}
                                            autoComplete="password" placeholder="password"
                                        />
                                         <InputLabel shrink htmlFor="bootstrap-input">character and number (5-8) </InputLabel>
                                    </FormGroup>
                                    <FormGroup className='checkusername'>
                                        <Button outline color="danger" >ตรวจสอบ username</Button>
                                    </FormGroup>

                                </div>
                                <div className="row" >
                                    <FormGroup className='FormGroup' >
                                        <Label for="firstname" className='colors'>ชื่อ</Label>
                                        <Input type="text" name="firstname" id="firstname" value={member.firstname || ''}
                                            onChange={this.handleChange}
                                            autoComplete="firstname" placeholder="firstname" />
                                    </FormGroup>
                                    <FormGroup className='FormGroup'>
                                        <Label for="lastname" className='colors'>นามสกุล</Label>
                                        <Input type="text" name="lastname" id="lastname" value={member.lastname || ''}
                                            onChange={this.handleChange}
                                            autoComplete="lastname" placeholder="lastname" />
                                    </FormGroup>

                                </div>
                                <div className="row">
                                    <FormGroup className="col-md-8 mb-8" className='FormGroup'>
                                        <Label for="idcard" className='colors'>เลขบัตรประชาชน</Label>
                                        <Input type="text" name="idcard" id="idcard" value={member.idcard || ''}
                                            onChange={this.handleChange}
                                            autoComplete="idcard" placeholder="ID card number" />
                                    </FormGroup>
                                    <FormGroup className="col-md-4 mb-3" className='FormGroup'>
                                        <Label for="email" className='colors'>E-mail</Label>
                                        <Input type="text" name="email" id="email" value={member.email || ''}
                                            onChange={this.handleChange}
                                            autoComplete="email" placeholder="E-mail" />
                                    </FormGroup>
                                    <FormGroup className="col-md-8 mb-3" className='birthday'>
                                        <Label for="birthday" className='colors' >วัน/เดือน/ปี เกิด</Label>
                                        <form className={useStyles.container} noValidate>
                                            <TextField
                                                id="date"

                                                type="date"
                                                defaultValue="2017-05-24"
                                                className={useStyles.textField}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    readOnly: true,
                                                }}
                                                name="birthday"
                                                onChange={this.handleChange}
                                            />
                                        </form>
                                    </FormGroup>
                                </div>
                            </fieldset>
                        </from>
                        <div className="save">
                        <FormGroup >
                            <Button outline color="primary" type="submit">บันทึกข้อมูล</Button>
                        </FormGroup>
                        <FormGroup >
                            <Button color="warning"  tag={Link} to={"/"}>กลับ</Button>
                        </FormGroup>
                        </div>
                    </Form>

                </Container>
            </div>
        );
    }
}
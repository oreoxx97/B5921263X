import React, { Component } from 'react';
import '../../App.css';
import { Link } from 'react-router-dom';
import { Container, Form, FormGroup, Label, Table, Button } from 'reactstrap';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';




class Login extends Component {
    emptyItem = {
        username: '',
        password: ''
      };

      emptyMember = {
        username: '',
        password: '',
        idcard: '',
        firstname: '',
        lastname: '',
        email: '',
        birthday: ''
    }

    constructor(props) {
        super(props);
        this.state = {  user: this.emptyItem,
                        getUser: [],
                        showPassword: false ,
                        member:this.emptyMember,
                        memberx:[],
                        isOpen:false,
                        checkUser:false
                      };
        this.handleChange = this.handleChange.bind(this);
        this.handleClickShowPassword = this.handleClickShowPassword.bind(this);
        this.handleMouseDownPassword = this.handleMouseDownPassword.bind(this);
    }

    login(){
      const {user , member , checkUser} = this.state;
      console.log(user.username , user.password, member)

        var check = false;
        member.map(x => {
          if(user.username == x.username && user.password == x.password){
            check = true;
            this.setState({checkUser : true});
            return
          }
          
        });
        if(check == false){alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้องทั้ง username และ  password")}

       

      // if(user.username != '' && user.password != '' ){
      //   fetch(`http://localhost:8080/api/username/${user.username}/${user.password}`)
      //   .then(response => response.json())
      //   .then(data => this.setState({ memberx : data }));
        
  
      //   this.setState({isOpen : true})
      // }
      // else{
      //   alert("กรุณากรอกข้อมูลให้ครบถ้วนและถูกต้อง")
      // }
    
     
    }

    handleChange(event) {
        const value = event.target.value;
        const name = event.target.name;
        const item = {...this.state.user};
        item[name] = value;
        this.setState({user: item});
        console.log(this.state.user);
    }

    handleClickShowPassword() {
        const {showPassword} = this.state;
        this.setState({ showPassword: !showPassword });
        console.log(showPassword);
    };
    
    handleMouseDownPassword(event) {
        event.preventDefault();
    };

    componentDidMount(){
      fetch(`http://localhost:8080/api/members`)
      .then(response => response.json())
      .then(data => this.setState({ member : data }));
    }

    render() {
        const {showPassword ,isOpen , memberx ,user,member ,checkUser} = this.state;
        console.log(this.state.memberx)
        console.log(member)

        if(checkUser == true){
          fetch(`http://localhost:8080/api/username/${user.username}/${user.password}`)
            .then(response => response.json())
            .then(data => this.setState({ memberx : data }));
            this.setState({checkUser : false})
            this.setState({isOpen : true})
            console.log(memberx)
            
        }

        console.log(memberx)



      if(isOpen == true){
        console.log("yes")
        window.location = "/home/" + memberx.id;
      }




        return (
          <div>
            <Container>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop: '15%'}}>
                <TextField
                    label="Username"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="username"
                    style={{ width: '250px' }}
                />
              </form>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
                <TextField
                    label="Password"
                    margin="normal"     
                    variant="outlined"
                    onChange={this.handleChange}
                    name="password"
                    style={{ width: '250px' }}
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              edge="end"
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                    }}
                />
              </form>
              <form style={{display: 'flex',  justifyContent:'center', alignItems:'center', paddingTop:'15px'}}>
              <FormGroup>
                  <Button style={{ background: '#000066' }} onClick={() => this.login()}>Login</Button>
              </FormGroup>
              <FormGroup style={{width: '10px'}} ></FormGroup>
              <FormGroup>
                  <Button style={{ background: '#000066' }} tag={Link} to={"/Members"}>Signup</Button>
              </FormGroup>
              <FormGroup style={{width: '10px'}} ></FormGroup>
              <FormGroup>
                  <Button style={{ background: '#000066' }} tag={Link} to={"/home/new"}>Home</Button>
              </FormGroup>
              </form>
            </Container>
            
          </div>
        );
      }
}
export default Login;
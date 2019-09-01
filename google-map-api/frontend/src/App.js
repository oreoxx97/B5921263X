import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Home from './register/Home';
import Login from './components/Login/Login';
import Member from './components/Login/Member';


class App extends Component {
  render() {
    return(
      <Router>
        <Switch>
          <Route path='/home/:id' exact={true} component={Home}/>
          <Route path='/' exact={true} component={Login}/>
          <Route path='/Members' exact={true} component={Member}/>
        </Switch>
      </Router>
    )
  }
}

export default App;

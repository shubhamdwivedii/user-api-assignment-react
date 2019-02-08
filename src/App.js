import React, { Component } from 'react';

import { Route, Redirect, Switch } from "react-router-dom";

import { ToastContainer } from 'react-toastify'
// import jwtDecode from 'jwt-decode';
import logo from './logo.svg';
import User from './components/user';
import Login from './components/login';
import Logout from "./components/logout";
import Signup from './components/signup';
import NavBar from './components/navbar';
import loginService from './services/loginService';

import 'react-toastify/dist/ReactToastify.css';
import './App.css';

class App extends Component {
  state = {}; 
  componentDidMount() {
    const user = loginService.getCurrentUser();
    this.setState({ user });   
  }

  render() {
    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={this.state.user} />
        <div className="container">
          {/* <Login /> */}
          {/* <Signup /> */}
        </div>
        
        <div className="container">
          <Switch>
            {/* <Route path="/login" component={Login} /> */}
            <Route path="/signup" component={Signup} />
            <Route path="/user/logout" component={Logout} />
            
            <Route path="/user" render={props => <User user={this.state.user} {...props} /> } />            
            {/* <Route path="/user" component={User} /> */}

            <Route path="/" component={Login} />
            
          </Switch>
        </div>



        <main className="container">
          {/* <Switch>
            <Route path="/login" component={Login} />
          </Switch> */}
        </main>
      </React.Fragment>
    );
  }
}

export default App;

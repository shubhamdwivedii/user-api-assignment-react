import React, { Component } from 'react';
import loginService from '../services/loginService';

class Logout extends Component {
    
    componentDidMount() {
        //localStorage.removeItem('token');
        loginService.logout();
        window.location = '/'
    }


    render() { 
        return null;
    }
}
 
export default Logout;
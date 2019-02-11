import React, { Component } from 'react';
//import Input from './common/input';
import Joi from 'joi-browser';

import Form from './common/form';
import loginService from '../services/loginService';
import { toast } from "react-toastify";


class Login extends Form {

    
    state = { //initialize state 
        data: { email: "", password: "" },
        errors: {}
    };

    schema = {
        email: Joi.string().required().trim().email().label("Email Id"),
        password: Joi.string().required().trim().label("Password")
    };


    email = React.createRef();

    // componentDidMount() {
    //     this.email.current.focus();
    // }

    doSubmit = async () => {
        //Call the server and save changes then redirect data 
        
        try{
            const { data } = this.state;
            console.log( data );
            await loginService.login(data.email, data.password);
            //const { data: jwt } = await login(data.email, data.password);
            //console.log(jwt);
            //localStorage.setItem("token",jwt);//stores json web token in browsers localStorage DB
            
            //now redirect user to homepage 
            //this.props.history.push('/');
            window.location = '/user';
            console.log('Submitted');
        }
        catch(ex){
            toast.error("Invalid Email-id or Password.");
            if(ex.response && ex.response.status === 400){
                const errors = {...this.state.errors};
                errors.email = ex.response.data;  
                this.setState({ errors }) 
            }
            
        }        

    }

    render() { 
            

        return (
        <div className="container">

            <div className="row">
                <div className="col">
                
                </div>
                <div className="col"> 
                    <br/>
                    <br/>
                    <div className="card bg-secondary text-white">
                        <div className="card-header"><h2>Login</h2></div>
                        <div className="card-body">              
                        
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput("email","Email Id","text", "Email Id")} 
                                {this.renderInput("password","Password", "password","Password")}
                                {this.renderButton('Login')}
                            </form>
                        </div> 
                    </div>   
                </div>
            </div>    

        </div> 
        );
    }
}
 
export default Login; 
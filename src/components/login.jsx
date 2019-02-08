import React, { Component } from 'react';
//import Input from './common/input';
import Joi from 'joi-browser';

import Form from './common/form';
import loginService from '../services/loginService';



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
        console.log('Submitted');
        try{
            const { data } = this.state;

            await loginService.login(data.email, data.password);
            //const { data: jwt } = await login(data.email, data.password);
            //console.log(jwt);
            //localStorage.setItem("token",jwt);//stores json web token in browsers localStorage DB
            
            //now redirect user to homepage 
            //this.props.history.push('/');
            window.location = '/user';
            
        }
        catch(ex){
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
                    <div className="jumbotron">              
                        <h1>Login</h1>
                        <form onSubmit={this.handleSubmit}>
                            {this.renderInput("email","Email Id")} 
                            {this.renderInput("password","Password", "password")}
                            {this.renderButton('Login')}
                        </form>
                    </div>    
                </div>
            </div>    

        </div> 
        );
    }
}
 
export default Login; 
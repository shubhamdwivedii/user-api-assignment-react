import React from 'react';
import Joi from "joi-browser";
import Form from "./common/form";
import * as userService from '../services/userService';

import loginService from '../services/loginService';

class Signup extends Form {
    state ={ //initializin state
        data: { 
            name: "",
            email: "",
            password: ""    
        },
        errors: {}
    };

    schema = {
        name: Joi.string().required().label("User Name"),
        email: Joi.string().email().required().label("Email Id"),//.unique()
        password: Joi.string().required().min(5).label("Password")
    };

    doSubmit = async () => {
        //Call the server 
        console.log("Sign-Up Submitted");
        try {
            const response = await userService.signup(this.state.data);
            //console.log(response);

            //auto login user when signup 
            //console.log("stuck after this....")
            loginService.loginWithJwt(response.headers['x-auth-token']);
            //console.log(jwt);
            //console.log("not stuck!!");
            //localStorage.setItem("token",jwt);
            //console.log(response.header['x-auth-token']);
            
            //logs-in and redirect user to homepage on sign-up
            //this.props.history.push('/');
            
            window.location = '/user';
            
            //console.log(response); 
        }
        catch(ex) {
            if(ex.response && ex.response.status === 400){//we sent a bad request
                const errors = { ...this.state.errors };
                errors.email = ex.response.data; //'...'
                this.setState({ errors }); 
            }
        }
    };

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
                            <h1>SignUp</h1>
                            <form onSubmit={this.handleSubmit}>
                                {this.renderInput("name","User Name")}
                                {this.renderInput("email","Email Id")} 
                                {this.renderInput("password","Password", "password")}
                                {this.renderButton('SignUp')}
                            </form>
                        </div>    
                    </div>
                </div>    
            </div>     
        );
    }
}
 
export default Signup
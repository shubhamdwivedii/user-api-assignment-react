import React, { Component } from 'react';
import { toast } from "react-toastify";
import { NavLink } from 'react-router-dom';
import Notes from './notes';
import UserNotes from './userNotes';
import CreateNote from './createNote';

class User extends Component {

    stylesLeft = {
        "position": "absolute",
        "overflow-y": "scroll",
        "width": "50%"
    }
    stylesRight = {
        "position": "absolute",
        "overflow-y": "scroll",
        "width": "50%"
    }
    bodyStyle = {
        "height":"100vh"
    }
    style = {
        "overflow-y":"scroll",
        "max-height":"100vh"
    }
    render() { 

        console.log(this.openCreate)
        
        if(!this.props.user)
            return (<h1>No UserDATA</h1>  );
        
        else
            toast.info("Welcome "+ this.props.user.name +"!!");
             
        return (
            <div style={this.bodyStyle}>
            <div className="container-fluid row">
                <br/>
                <br/>       
                <br/>
                <br/>
                {/* <div className="jumbotron row">
                    <div className="col">
                        <h2>
                            Welcome {this.props.user.name} !!
                        </h2>
                    </div>
                    
                </div> */}

                
                
                <div className="d-flex flex-column w-50 col-sm-6">
                    <div style={this.style} className="w-100">
                        <br/>   
                        <UserNotes user={this.props.user} />
                    </div>
                </div>
                <div className="d-flex flex-column w-50 col-sm-6">
                    <div style={this.style} className="w-100">
                        <br/>
                        <Notes user={this.props.user} />
                    </div>
                </div>
                
            </div>
            </div>
        );

       
    }
}
 
export default User;
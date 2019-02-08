import React, { Component } from 'react';
import { toast } from "react-toastify";

const User = (props) => {

    
    if(!props.user)
       return (<h1>No UserDATA</h1>  );
    else
        toast("You are now logged-in!!")   
    return (
        <div className="container">
            <br/>
            <br/>       
            <div className="jumbotron">
                <h2>
                    Welcome {props.user.name} !!
                </h2>
            </div>
        </div>
        );
}
 
export default User;
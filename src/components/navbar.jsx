import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';

//Stateless Functional Component 
const NavBar = ({ user }) => {
    return ( 
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            {/* <a className="navbar-brand" href="#">Navbar</a> */}

            {!user && (
                <a className="navbar-brand mb-0 h1" href="#">
                    <span className="badge badge-primary">
                        CODALIEN ASSIGNMENT
                    </span>
                </a>

            )}
            {user && (  
                <NavLink className="nav-link navbar-brand mb-0 h1" to="/user">
                    <span className="badge badge-pill badge-secondary">
                        { user.name }
                    </span>
                </NavLink>
            )}



            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <div className="navbar-nav ml-auto">
                    {!user && (
                        
                    <React.Fragment>
                        
                        {/* <NavLink className="nav-item nav-link" to="/">
                            Login
                        </NavLink> */}
                        <NavLink className="nav-item nav-link" to="/signup">
                           <span className="btn btn-primary">Sign-up</span> 
                        </NavLink>
                    </React.Fragment> )}
                    {user && (
                    <React.Fragment>
                        {/* <NavLink className="nav-item nav-link" to="/user">
                            { user.name }
                        </NavLink> */}
                        <NavLink className="nav-item nav-link" to="/user/logout">
                        <span className="btn btn-warning">Logout</span> 
                        </NavLink>
                    </React.Fragment> )}
                                       
                </div>
            </div>
        </nav>
    );
}
 
export default NavBar;


import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
//import http from '../services/httpService';
import noteService from '../services/noteService';
import { toast } from 'react-toastify';

class Notes extends Component {
    state = { 
        notes: [],
        showDetails: "" //note id             
    }

    async componentDidMount() {
        
        const notes = await noteService.getOtherUserNotes(this.props.user._id);
        this.setState({ notes });
    };

    refreshNotes = async () => {
        const notes = await noteService.getOtherUserNotes(this.props.user._id);
        this.setState({ notes:notes, showDetails:"" });
        
    }

    doRefreshNotes = () => {
        this.refreshNotes();
        toast("Posts list refreshed!!");
    }

    // handleAdd = () => {
    //     console.log("Add");
    //   };
    
    handleLike = async (note) => {
        //console.log(note);
        const result = await noteService.likeNote(note._id);
        console.log(result);
        if(result.data.includes(this.props.user.name))
            toast.error("You liked "+ note.author.name +"'s"+" post: \n"+ '"'+note.title+'"');
        else
            toast.warn("You Unliked "+ note.author.name +"'s"+" post");
        this.refreshNotes();
    };

    showDetails = async (note) => {
        console.log("note clicked");
        console.log(note.title);
        this.setState({showDetails:note._id});
    };

    hideDetails = async (note) => {
        this.setState({showDetails:""});
    }

    getRandomColor = () =>{
        const colors = [
            "text-white bg-primary",
            "text-white bg-secondary",
            "text-white bg-success",
            "text-white bg-danger",
            "bg-warning",
            "text-white bg-info",
            "text-white bg-dark",
            "bg-light"
        ]
        return colors[Math.floor(Math.random() * colors.length)];  
    }

    render() { 
        return ( 

                <div>
                    <div className="card bg-dark text-white">
                        <div className="card-footer">
                            <h4>Other User's Notes <span className="badge badge-light badge-pill">{this.state.notes.length}</span>
                                <button className="btn btn-info float-right" 
                                    onClick={this.doRefreshNotes}>
                                    Refresh
                                </button>
                            </h4>                                   
                        </div>  
                    </div>  
                    <br/>
                    {this.state.notes.map(note => (
                    <div>
                        <div>{(note._id===this.state.showDetails)
                            ? <div className={"card "+note.color} key={note._id}>
                                <div class="card-header">{note.author.name}</div>
                                <div className="card-body" onClick={() => this.hideDetails(note)}>
                                    <h5 className="card-title">{note.title}</h5>
                                    <p class="card-text">{note.text}</p>            
                                </div>
                                <div class="card-footer">
                                    {/* {new Date(note.date).toTimeString()+"  "+new Date(note.date).toDateString()} */}
                                    {new Date(note.date).toLocaleString()}                                                           
                                    <div
                                        className="card text-white bg-danger mt-2"
                                        // onClick={() => this.handleLike(note)}
                                    >
                                        <div className="card-header">
                                            Liked By
                                        
                                            <h6>{note.likes.map(like =><i>{like} </i>)}
                                            </h6>
                                        </div>
                                    </div> 
                                </div>
                            </div> 
                            : <div className={"card "+note.color} key={note._id}>
                                <div class="card-header">{note.author.name}</div>
                                <div className="card-body"  onClick={() => this.showDetails(note)}>
                                    <h5 className="card-title">{note.title}</h5>
                                    <p class="card-text">{(note.text.length >= 56) ? note.text.slice(0,56)+"..." : note.text }</p>            
                                </div>
                                <div class="card-footer">
                                    {/* {new Date(note.date).toTimeString()+"  "+new Date(note.date).toDateString()} */}
                                    {new Date(note.date).toLocaleString()}                                                           
                                    <button
                                        className="btn btn-danger btn-sm float-right"
                                        onClick={() => this.handleLike(note)}
                                    >
                                        Likes
                                        <span className="badge badge-warning badge-pill ml-1">
                                            {note.likes.length}
                                        </span>
                                    </button> 
                                </div>
                            </div>
                        }</div>
                        <br/>
                    </div>
                    ))}
           
            </div>
        );
    }
}
 
export default Notes;
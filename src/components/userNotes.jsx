import React, { Component } from 'react';
import noteService from '../services/noteService';
import UpdateNote from './updateNote';
import CreateNote from './createNote';
import { toast } from 'react-toastify';

class UserNotes extends Component {

    state = {
        notes: [],
        newNote: {
            title: '',
            text: ''
        },
        showDetails:"",
        viewCreate: false,
        showUpdate: "", //id of note to update
        viewUpdate: false,
        showDelete: "", //id of note to delete
        viewDelete: false,
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

    showDetails = async (note) => {
        console.log("Show Details: ",this.state.showDetails)
        if(this.state.showDetails == note._id)
            {
                this.setState({showDetails:""});
            }
        else
            this.setState({showDetails:note._id});
    }
    hideDetails = async (note) => {
       
    }

    showCreateForm = () => this.setState({ viewCreate: true});
    showDeleteForm = (note) => this.setState({ showDelete:note._id, viewDelete: true});
    showUpdateForm = (note) => this.setState({ showUpdate:note._id, viewUpdate: true});


    async componentDidMount() {
        console.log("IN userNOtes :", this.props.user);
        const notes = await noteService.getUserNotes(this.props.user._id);
        this.setState({ notes });
    };
    
    handleUpdate = note => {
        console.log("Update", note);
    };
    
    handleDelete = async (note) => {
        console.log("Delete", note);
        // send http delete request 
        console.log("handleDelete:  ",note._id);
        const result = await noteService.deleteNote(note._id);
        this.setState({ showDelete:"", viewDelete: false});
        this.refreshNotes();
        toast.warn("Post deleted successfully!!");
    };

    doRefreshNotes = () => {
        this.refreshNotes();
        toast("Your posts refreshed!!");
    }
    refreshNotes = async () => {
        const notes = await noteService.getUserNotes(this.props.user._id);
        this.setState({ notes });
        
    }

    hideCreateCompononet = async (created) =>{
        if(created){
            toast.success("New post created successfully!!!")
            const notes = await noteService.getUserNotes(this.props.user._id);
            this.setState({ notes:notes, viewCreate:false });
        }
        else
            this.setState({ viewCreate:false })
        // this.setState({viewCreate:false});
    }

    hideUpdateComponent = async (updated) =>{
        if(updated){
            toast.info("Post updated successfully!!!")
            const notes = await noteService.getUserNotes(this.props.user._id);
            this.setState({ notes:notes, showUpdate:"", viewUpdate:false });
        }
        else
            this.setState({ viewUpdate:false })

    }

    cancelDelete = () =>{
        this.setState({ showDelete:"", viewDelete: false});
        this.refreshNotes();
    }


    render() { 
        
       
        return( 
            <div>
{/* //            <div class="card" style="width: 18rem;"> */}

                <div>
                    {/* CREATE NOTE FORM */}
                    <div className="card text-white bg-secondary">           
                        {(this.state.viewCreate) 
                            ? <div className="card-footer"><CreateNote onCreate={this.hideCreateCompononet}/></div> 
                            : 
                                <div className="card-footer">
                                    <h4>Your Notes <span className="badge badge-dark text-white badge-pill">{this.state.notes.length}</span>
                                        <button className="btn btn-info float-right ml-2" 
                                            onClick={this.showCreateForm}>
                                            Create Note
                                        </button>
                                        <button className="btn btn-info float-right" 
                                            onClick={this.doRefreshNotes}>
                                            Refresh
                                        </button>
                                    </h4>
                                </div>                        
                        }
                    </div>
                    <br/>
                    
                    {/* USER NOTES LIST */}
                    {this.state.notes.map(note => (
                    <div>
                        {(this.state.viewUpdate && this.state.showUpdate === note._id) 
                            ? 
                            // UPDATE NOTE FORM  
                            <div className={"card "+note.color}>
                                <div className={"card-footer"}>
                                    <UpdateNote onUpdate={this.hideUpdateComponent} note={note}/>
                                </div> 
                            </div>  
                            :
                            //NOTE CARD 
                            <div className={"card "+note.color} key={note._id}>
                                <div className="card-body" onClick={() => this.showDetails(note)}>
                                    <h5 className="card-title">{note.title}</h5>
                                    <p class="card-text">{((this.state.showDetails!=note._id && note.text.length >= 56 )) ? note.text.slice(0,56)+"..." : note.text }</p>
                                </div>
                                {/* NOTE CARD FOOTER */}
                                <div class="card-footer">
                                    {(this.state.showDetails==note._id)   
                                        ? 
                                        <div>
                                            {/* {new Date(note.date).toTimeString()+"  "+new Date(note.date).toDateString()} */}
                                            {new Date(note.date).toLocaleString()}                                                           
                                            <div
                                                className="card text-white bg-danger mt-2"
                                                // onClick={() => this.handleLike(note)}
                                            >
                                                <div className="card-header">
                                                    Liked By
                                                
                                                    <h6>{(note.likes.length==0) ? <i>Nobody :'(</i> : note.likes.map(like =><i>{like} </i>)}
                                                    </h6>
                                                </div>
                                            </div> 
                                        </div>
                                        :
                                        <div> 
                                        {(this.state.viewDelete && this.state.showDelete===note._id)
                                        ?
                                        // DELELTE FORM 
                                        <div>
                                            <h6>
                                                Are you sure you want to delete this note ? 
                                            </h6>
                                            <button
                                                className="btn btn-success btn-sm ml-2 float-right"
                                                onClick={() => this.cancelDelete()}
                                            >
                                                Cancel
                                            </button>
                                            <button
                                                className="btn btn-danger btn-sm float-right"
                                                onClick={() => this.handleDelete(note)}
                                            >
                                                Delete
                                            </button>   
                                        </div>
                                        :
                                        //NOTE CARD FOOTER  
                                        <div>
                                            {new Date(note.date).toLocaleString()}
                                            <button
                                                className="btn btn-danger btn-sm float-right ml-2"
                                            >
                                                Likes
                                                <span className="badge badge-warning badge-pill ml-1">
                                                    {note.likes.length}
                                                </span>
                                            </button> 
                                            <button
                                                className="btn btn-info btn-sm ml-2 float-right"
                                                onClick={() => this.showUpdateForm(note)}
                                            >
                                                Update
                                            </button>                            
                                            <button
                                                className="btn btn-danger btn-sm float-right"
                                                onClick={() => this.showDeleteForm(note)}
                                            >
                                                Delete
                                            </button> 
                                        </div>                                    
                                        }
                                        
                                    </div>
                                
                                    }
                                </div>
                            </div>
                        //add closing bracket here
                        }
                        <br/>
                    </div>
                    ))}
                    
                </div>     
            </div>
        );
    }
}
 
export default UserNotes
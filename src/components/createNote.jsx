import React, { Component } from 'react';
import noteService from '../services/noteService';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

class CreateNote extends Component {
    state = {
        newNote: {
            title: '',
            text: ''
        },
        errors: {}
    }

    schema = {
        title: Joi.string().min(5).max(50).required().label("Title"),
        text: Joi.string().min(5).max(500).required().label("Text")
    }

    validate = () =>{
        //console.log(this.state.newNote);
        const result = Joi.validate(this.state.newNote , this.schema , {abortEarly:false});
        if(!result.error) return null

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message; 

        return errors;
    }

    handleCancel = () =>{
        console.log("Cancel clicked!!");
        this.props.onCreate(false);
    }
      
    handleCreate = event => {
        event.preventDefault();
        const newNote = this.state.newNote;
        const errors = this.validate();
        console.log(errors);
        console.log("from handleCreate: ");
        console.log(newNote);
        this.setState({ newNote: newNote, errors: errors || {} });
        if(errors){
            for(let error in errors)
                toast.error(errors[error]);
            return;
        }
        
        console.log('Submitted');

        //handle errors here 
        this.doSubmit();
    };
    
    doSubmit = async () => {
        console.log("NEW NOTE TITLE :" + this.state.newNote.title + "TEXT: "+this.state.newNote.text );
        const { newNote } = this.state;
        try {
            const result = await noteService.createNote(newNote.title, newNote.text)
            
        } catch (error) {
            console.log("Create NOte error");
        }
        //window.location = '/user';
        this.props.onCreate(true);
        
    };

    handleChange = event =>{
        const newNote = {...this.state.newNote};
        newNote[event.currentTarget.name] = event.currentTarget.value;
        //console.log(event.currentTarget.name +">>>>"+ event.currentTarget.value);
        console.log(newNote);
        this.setState({ newNote });
        //console.log(this.state.newNote.title +">>>>>>"+this.state.newNote.text);
    };

    render() { 
        
        const { newNote } = this.state;

        return (
            <div>
                    {/* <h1>Create New</h1> */}

                    {/* <form onSubmit={this.handleCreate}> */}
                    <form>
                            <div className="form-group">
                                <label htmlFor="title">Title</label>
                                
                                <input 
                                    className="form-control"
                                    value={newNote.title} 
                                    name="title"
                                    onChange={this.handleChange}     
                                    id="title" type="text"
                                    placeholder="Please enter a title..."/>
                                    
                                {this.state.errors.title && <div className="alert alert-danger">{this.state.errors.title}</div>}
                            </div>
                            <div className="form-group">
                                <label htmlFor="text">Text</label>
                                <textarea 
                                    className="form-control"
                                    rows="4"
                                    value={newNote.text}
                                    name="text" 
                                    onChange={this.handleChange}
                                    id="text" type="text"
                                    placeholder="Enter your text here...">
                                </textarea>
                                {this.state.errors.text && <div className="alert alert-danger">{this.state.errors.text}</div>}
                            </div> 
                            <button className="btn btn-info" onClick={this.handleCreate}>Create</button>
                            <button onClick={this.handleCancel} className="btn btn-success ml-2">
                                Cancel
                            </button>               
                    </form>
                </div>
          );
    }
}
//hellov
export default CreateNote;
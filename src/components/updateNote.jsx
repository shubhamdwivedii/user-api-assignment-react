import React, { Component } from 'react';
import noteService from '../services/noteService';
import Joi from 'joi-browser';
import { toast } from 'react-toastify';

class UpdateNote extends Component {
    state = { 
        newNote: {
            title: '',
            text: ''
        },
        errors: {}
    }

    componentDidMount(){
        console.log(this.props);
        if(this.props.note)
            this.setState({newNote:this.props.note});
        else
            console.log("Update Error no note details in props");    
    }

    schema = {
        _id: Joi.string().required(),
        title: Joi.string().min(5).max(50).required().label("Title"),
        text: Joi.string().min(5).max(500).required().label("Text")
    }

    validate = () =>{
        //console.log(this.state.newNote);
        const tempNote = { _id: this.state.newNote._id, title: this.state.newNote.title, text: this.state.newNote.text };
        const result = Joi.validate(tempNote , this.schema , {abortEarly:false});
        if(!result.error) return null

        const errors = {};
        for(let item of result.error.details)
            errors[item.path[0]] = item.message; 

        return errors;
    }

    handleCancel = () =>{
        console.log("Cancel clicked!!");
        this.props.onUpdate(false);
    }

    handleUpdate = event => {
        event.preventDefault();
        const newNote = this.state.newNote;
        const errors = this.validate();
        console.log(errors);
        console.log("from handleUpdate: ");
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
        console.log("Updated NOTE TITLE :" + this.state.newNote.title + "TEXT: "+this.state.newNote.text );
        const { newNote } = this.state;
        try {
            const result = await noteService.updateNote(newNote._id, newNote.title, newNote.text)
            
        } catch (error) {
            console.log("Update NOte error");
        }
        //window.location = '/user';
        this.props.onUpdate(true);
        
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
                                />
                                    
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
                                >
                                </textarea>
                                {this.state.errors.text && <div className="alert alert-danger">{this.state.errors.text}</div>}
                            </div> 
                            <button className="btn btn-info" onClick={this.handleUpdate}>Update</button>
                            <button onClick={this.handleCancel} className="btn btn-success ml-2">
                                Cancel
                            </button>               
                    </form>
                </div>
          );
    }
}
 
export default UpdateNote;
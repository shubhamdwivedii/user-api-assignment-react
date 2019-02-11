import React, { Component } from 'react';

class NoteDetails extends Component {
    state = { 
        note:{
            title: "",
            text: "",
            author: "",
            date: "",
            likes: []
        }
     }
    render() { 
        return ( <h1>NOte Detials</h1> );
    }
}
 
export default NoteDetails;
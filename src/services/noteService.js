import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/notes"; 
const apiEndpointNote = apiEndpoint + "/note";

export async function createNote(title, text){

    console.log(title,text);
    const jwt = localStorage.getItem("token");
    const result = await http.post(
        apiEndpoint, {title, text} ,{ 'headers': { 'Content-Type': 'application/json', 'x-auth-token': jwt } }
        // ,
        // { 'headers': { 'x-auth-token': jwt } }
    );
    return result;

}

export async function updateNote(_id,title,text){
    console.log("NOte to be Updateed" + _id);
    const jwt = localStorage.getItem("token");
    http.setJwt(jwt);
    const result = await http.put(
        apiEndpointNote, { _id,title,text } //, { 'headers': { 'Content-Type': 'application/json', 'x-auth-token': jwt } }
    );
}

export async function deleteNote(_id){
    console.log("note to delete" + _id);
    const jwt = localStorage.getItem("token");
    http.setJwt(jwt);
    const result = await http.delete(
        apiEndpointNote, { data: { _id } } //, { 'headers': { 'Content-Type': 'application/json', 'x-auth-token': jwt } }
    );  //axios delete does not support body send body as config data
    return result; 
}

export async function likeNote(id){
    const jwt = localStorage.getItem("token");
    const result = await http.patch(
        apiEndpoint, { _id: id } , { 'headers': { 'Content-Type': 'application/json', 'x-auth-token': jwt } }
    );
    return result; 
}


export async function getAllNotes(){

    const jwt = localStorage.getItem("token");
    const { data: notes } = await http.get(
        apiEndpoint,
        { 'headers': { 'x-auth-token': jwt } }
    );
    return notes; 
}

export async function getOtherUserNotes(id){
    const allNotes = await getAllNotes();
    const otherUserNotes = allNotes.filter( note => {
        return note.author._id !== id;    
    });

    return otherUserNotes;
    

}

export async function getUserNotes(id){
    const allNotes = await getAllNotes();
    const userNotes = allNotes.filter( note => {
        return note.author._id === id;    
    });

    // for(let note of allNotes){
    //     console.log(note.author._id,note.author.name);
    // }

    return userNotes;
    // console.log("getALLNOTES" + allNotes);
}



export default {
    createNote,
    deleteNote,
    updateNote,
    getAllNotes,
    getUserNotes,
    likeNote,
    getOtherUserNotes
};
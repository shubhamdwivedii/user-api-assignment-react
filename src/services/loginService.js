import http from './httpService';
import { apiUrl } from '../config.json';
import jwtDecode from 'jwt-decode';
// import { toast } from "react-toastify";


const apiEndpoint = apiUrl + "/login"; //"http://localhost:5000/api/login";// apiUrl + "/login";
const tokenKey = 'token';

export async function login(email,password){

    // toast("You are now logged-in!!");
    // return http.post(apiEndpoint, { email, password})
    const { data: jwt } = await http.post(apiEndpoint, { email, password})
    localStorage.setItem(tokenKey,jwt);
}

export function logout() {

    //toast("You are now logged-out!!");
    localStorage.removeItem(tokenKey);    
}

export function loginWithJwt(jwt){
    //toast("Welcome new user!!");
    localStorage.setItem(tokenKey,jwt);
}


export function getCurrentUser() {
    try{
        const jwt = localStorage.getItem(tokenKey);
        return jwtDecode(jwt);
        //console.log(user);
        //this.setState({ user });
      }
      catch(ex){
          return null;
      }
}


export default {
    login,
    logout,
    loginWithJwt, 
    getCurrentUser
};
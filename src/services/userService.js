import http from './httpService';
import { apiUrl } from '../config.json';

const apiEndpoint = apiUrl + "/users";  //"http://localhost:5000/api/users";// apiUrl + "/users";

export function signup(user){
    return http.post(apiEndpoint, {
        email: user.email,
        password: user.password,
        name: user.name
        }//, 
        // {
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Access-Control-Allow-Origin' : '*',
        //         'Access-Control-Allow-Methods' : 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        //     }
        // }
    );
}
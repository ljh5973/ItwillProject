import axios from "axios";
import {
    LOGIN_USER,
    REGISTER_USER,
    GOOGLE_LOGIN
} from '../_action/types';


export function loginUser(dataTosubmit) {
    const request = axios.post('/api/users/login', dataTosubmit)
            .then(response => response.data)
        console.log(request);
    return {
        type: LOGIN_USER,
        payload: request

    }
}

export function registerUser(dataTosubmit) {
    const request = axios.post('/api/users/register', dataTosubmit)
            .then(response => response.data)

    return {
        type: REGISTER_USER,
        payload: request

    }
}

export function googleLogin(data){
    const request =axios.get('/googleLogin',data)
    .then(response=>response.data)

    return {
        type: GOOGLE_LOGIN,
        payload:request
    }
}
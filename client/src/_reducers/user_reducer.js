import {
    LOGIN_USER, 
    REGISTER_USER,
    GOOGLE_LOGIN
} from '../_action/types';


export default function (state={}, action) {
    switch (action.type) {
        case LOGIN_USER:
            console.log(action);
            return {...state, loginSuccess: action.payload}
            break;
        case REGISTER_USER:
            
            return {...state, register: action.payload}
            break;
        
        case GOOGLE_LOGIN:
            return{...state, register: action.payload}
            break;
        default:
            return state;
    }
}
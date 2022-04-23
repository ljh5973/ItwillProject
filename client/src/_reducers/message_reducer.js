import{
    SAVE_MESSAGE,
} from '../_action/types';

export default function (state={messages:[]}, action){
    switch(action.type){
        case SAVE_MESSAGE:
            return {...state, messages:state.messages.concat(action.payload)}
            break;
            default:
                return state;
    }
}
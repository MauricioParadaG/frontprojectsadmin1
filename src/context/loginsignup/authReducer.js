import {SIGNUP_SUCCESSFULL, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESSFULL, LOGIN_ERROR, LOGOUT_SESSION} from '../../types/index';

export default (state, action) => {
    switch (action.type){
            
        case SIGNUP_SUCCESSFULL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null,
            }

        case SIGNUP_ERROR:
            return {
                ...state,
                token: null,
                message: action.payload,
            }

        default: 
        return state;
    }
}

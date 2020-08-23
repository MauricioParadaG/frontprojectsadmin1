import {SIGNUP_SUCCESSFULL, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESSFULL, LOGIN_ERROR, LOGOUT_SESSION} from '../../types/index';

export default (state, action) => {
    switch (action.type){
            
        case SIGNUP_SUCCESSFULL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null
            }

            
        case LOGIN_SUCCESSFULL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null
            }


        case GET_USER:
            return {
                ...state,
                authenticate: true,
                user: action.payload
            }

        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: false,
                user:null,
                message: action.payload,
            }

        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: false,
                user:null,
                message: action.payload,
            }

        case LOGOUT_SESSION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: false,
                user:null,
                message: action.payload,
            }

        default: 
        return state;
    }
}

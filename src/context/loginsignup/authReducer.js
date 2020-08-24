import {SIGNUP_SUCCESSFULL, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESSFULL, LOGIN_ERROR, LOGOUT_SESSION} from '../../types/index';

export default (state, action) => {
    switch (action.type){
            
        case SIGNUP_SUCCESSFULL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null,
                loadingHOC: false
            }

            
        case LOGIN_SUCCESSFULL:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                authenticate: true,
                message: null,
                loadingHOC: false
            }


        case GET_USER:
            return {
                ...state,
                authenticate: true,
                user: action.payload,
                loadingHOC: false
            }

        case SIGNUP_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: null,
                user:null,
                message: action.payload,
                loadingHOC: false
            }

        case LOGIN_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: null,
                user:null,
                message: action.payload,
                loadingHOC: false
            }

        case LOGOUT_SESSION:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                authenticate: null,
                user:null,
                message: action.payload,
                loadingHOC: false
            }

        default: 
        return state;
    }
}

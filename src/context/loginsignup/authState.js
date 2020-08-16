import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clientAxios from '../../config/axios';

import {SIGNUP_SUCCESSFULL, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESSFULL, LOGIN_ERROR, LOGOUT_SESSION} from '../../types/index';


const AuthState = props => {



    const initialState = {
    
        token: localStorage.getItem('token'), 
        authenticate: null,
        user:null,
        message: null
    }

    // Dispatch
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // functions - Login, signup, more

    // Signup 
    const signupUser = async signupFormData =>{
        try {
            const formAnswer = await clientAxios.post('/api/users', signupFormData);
            console.log(formAnswer);

            dispatch({
                type: SIGNUP_SUCCESSFULL,
                payload: formAnswer.data
            })
        } catch (error) {
            console.log(error.response.data.msg);
            dispatch({
                type: SIGNUP_ERROR,
            })
        }

    }



    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            authenticate: state.authenticate,
            user: state.user,
            message: state.message,
            signupUser

          }}
        >
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthState;

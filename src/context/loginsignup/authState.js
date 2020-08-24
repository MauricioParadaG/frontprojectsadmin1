import React, { useReducer } from 'react';

import AuthContext from './authContext';
import AuthReducer from './authReducer';

import clientAxios from '../../config/axios';

import {SIGNUP_SUCCESSFULL, SIGNUP_ERROR, GET_USER, LOGIN_SUCCESSFULL, LOGIN_ERROR, LOGOUT_SESSION} from '../../types/index';

import tokenAuth from '../../config/token';

const AuthState = props => {

    const initialState = {
    
        token: localStorage.getItem('token'), 
        authenticate: null,
        user:null,
        message: null,
        loadingHOC: true
    }

    // Dispatch
    const [state, dispatch] = useReducer(AuthReducer, initialState);

    // functions - Login, signup, logout,
    // Signup 
    const signupUser = async signupFormData =>{
        try {
            const apiAnswerofForm = await clientAxios.post('/api/users', signupFormData);
            console.log(apiAnswerofForm);

            dispatch({
                type: SIGNUP_SUCCESSFULL,
                payload: apiAnswerofForm.data
            });

            // get user from function in authState.js
            authenticateUser();
        } catch (error) {
            console.log(error.response.data.msg);
            // define error msg to reducer
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: SIGNUP_ERROR,
                payload: alert
            })
        }
    }


    // Getting the authenticate user
    const authenticateUser = async () =>{
        const token = localStorage.getItem('token');
        if(token){
            // Function that send a token in a Header
            tokenAuth(token);
            //console.log("paso por aqui? envia token a header");
        }
        try {
            const apiAnsweraUser = await clientAxios.get('/api/auth');
          //  console.log("paso por aqui? auth bien");
            dispatch({
                type: GET_USER,
                payload: apiAnsweraUser.data.user
            })
            //console.log(apiAnsweraUser);
            
        } catch (error) {
          //  console.log("paso por aqui? auth token al carrer");
            console.log(error.response);
            dispatch({
                type: LOGIN_ERROR
            })

        }
    }

    const loginUser = async loginFormData =>{
        try {
            const apiAnswerofForm = await clientAxios.post('/api/auth', loginFormData);
          //  console.log("paso por aqui? login bien");
            console.log(apiAnswerofForm);

            dispatch({
                type: LOGIN_SUCCESSFULL,
                payload: apiAnswerofForm.data
            });

            // get user from function in authState.js
            authenticateUser();
        } catch (error) {
            console.log(error.response.data.msg);
         //   console.log("paso por aqui? token login al carrer");
            // define error msg to reducer
            const alert = {
                msg: error.response.data.msg,
                category: 'alert-error'
            }

            dispatch({
                type: LOGIN_ERROR,
                payload: alert
            })
        }
    }

    const logoutUser = () =>{
        dispatch({
            type: LOGOUT_SESSION
        })
    }


    return (
        <AuthContext.Provider
        value={{
            token: state.token,
            authenticate: state.authenticate,
            user: state.user,
            message: state.message,
            loadingHOC: state.loadingHOC,
            signupUser,
            loginUser,
            authenticateUser,
            logoutUser
          }}
        >
            {props.children}
        </AuthContext.Provider>
    )

};

export default AuthState;

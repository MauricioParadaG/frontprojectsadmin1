import React, {useState, useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/loginsignup/authContext';

import { useForm } from 'react-hook-form';

const LoginComponent = props => {

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const {message, authenticate, loginUser} = authContext;

    const { register, handleSubmit, errors } = useForm();

    const [loginFormData, setLoginFormDataState] = useState(
        {
           email:'',
           password:''
        }
    );

    useEffect(() => {
        if (authenticate){
            props.history.push('/projects');
        }
        if (message){
            showAlert(message.msg, message.category);
        }
        
    }, [message, authenticate, props.history]);

/*
    const onChangeLogin = event => {
        setLoginFormDataState({
            ...loginFormData,
            // adding an ID - uuid library
            //id: uuid(),
            // adding the form info to the state
            [event.target.name]: event.target.value
        });
    }  
*/

    const onSubmit = data => {
        console.log(data);

        loginUser(data);
    }

    return (
        <div className="form-user">
        { alert ? ( <div className={`alert ${alert.category}`}> {alert.msg} </div> )  : null }

            <div className="container-form shadow-dark">
                <h1>Login </h1>

                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        ref={register({ 
                            required: true,
                            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i
                          })}
                        />
              {errors.email?.type === 'required' && <span>Debes indicar un correo electrónico.</span>
              }
              {errors.email?.type === 'pattern' && <span>Debes indicar un correo electrónico válido.</span>
              }
                    </div>

                    <div className="field-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="*******"
                        ref={register({ required: true, minLength: 6 })}
                        />
              {errors.password?.type === 'required' && <span>Contraseña obligatoria.</span>
              }

              {errors.password?.type === 'minLength' && <span>Tu contraseña debe tener al menos 8 caracteres. Inténtalo de nuevo.</span>
              }
                    </div>

                    {/** Button */}
                    <div className="field-form">
                        <input type="submit"
                        className="btn btn-primary btn-block"
                        value="Login"
                        />
                    </div>

                </form>

                <Link to={"/new-account"} className="link-account">
                    Create New Account
                </Link>
            </div>
        </div>
    )
}

export default LoginComponent;

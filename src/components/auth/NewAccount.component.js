import React, { useContext, useEffect} from 'react';
import {Link} from 'react-router-dom';

import AlertContext from '../../context/alerts/alertContext';
import AuthContext from '../../context/loginsignup/authContext';

import { useForm } from 'react-hook-form';

const NewAccountComponent = props=> {

    const alertContext = useContext(AlertContext);
    const {alert, showAlert} = alertContext;

    const authContext = useContext(AuthContext);
    const {message, authenticate, signupUser} = authContext;

    const { register, handleSubmit, errors } = useForm();

    /*
    const [createAccountForm, setCreateAccountFormState] = useState(
        {
           name:'',
           email:'',
           password:'',
           confirm:''
        }
      );
    */

    useEffect(() => {
        if (authenticate){
            props.history.push('/projects');
        }
        if (message){
            showAlert(message.msg, message.category);
        }
        // eslint-disable-next-line
    }, [message, authenticate, props.history]);

      /*
    const onChangeAccount = event => {
        setCreateAccountFormState({
            ...createAccountForm,
            // adding an ID - uuid library
            //id: uuid(),
            // adding the form info to the state
            [event.target.name]: event.target.value
        });
    }
    */

    const onSubmit = data => {
        console.log(data);
      
        // Validation - just an alert test - not working with react-hook-form
        /*
        if (createAccountForm.name.trim() === ''){
            showAlert('all fields are required', 'alert-error');
            return;
        }
        */
        // register a user function from Context
        //authContext.signupUser(createAccountForm);
        signupUser(data);
      }

      /*
    const onSubmit = event => {
        event.preventDefault();

        // Validation
        // register a user function from Context
    }
    */

    return (
    <div className="form-user">
        { alert ? ( <div className={`alert ${alert.category}`}> {alert.msg} </div> )  : null }
        <div className="container-form shadow-dark">
            <h1>Create New Account</h1>

            <form onSubmit={handleSubmit(onSubmit)}>

                <div className="field-form">
                    <label htmlFor="name">Name</label>
                    <input type="text"
                    id="name"
                    name="name"
                    placeholder="Name"
                    ref={register({ required: true })}
                   //value={createAccountForm.name}
                   //onChange={onChangeAccount}
                    />
              {errors.name?.type === 'required' && <span>Nombre obligatorio.</span>
              }


                </div>

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
                    //value={createAccountForm.email}
                    //onChange={onChangeAccount}
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
                    //value={createAccountForm.password}
                    //onChange={onChangeAccount}
                    />
              {errors.password?.type === 'required' && <span>Contraseña obligatoria.</span>
              }

              {errors.password?.type === 'minLength' && <span>Tu contraseña debe tener al menos 8 caracteres. Inténtalo de nuevo.</span>
              }
                </div>

                <div className="field-form">
                    <label htmlFor="confirm">Confirm Password</label>
                    <input type="password"
                    id="confirm"
                    name="confirm"
                    placeholder="*******"
                    ref={register({ required: true, minLength: 6 })}
                    //value={createAccountForm.confirm}
                    //onChange={onChangeAccount}
                    />
              {errors.confirm?.type === 'required' && <span>Confirmar la contraseña.</span>
              }

              {errors.confirm?.type === 'minLength' && <span>Tu contraseña debe tener al menos 8 caracteres. Inténtalo de nuevo.</span>
              }
                </div>

                {/** Button */}
                <div className="field-form">
                    <input type="submit"
                    className="btn btn-primary btn-block"
                    value="Create Account"
                    />
                </div>

            </form>

            <Link to={"/"} className="link-account">
                Back to Login
            </Link>
        </div>
    </div>
    )
}

export default NewAccountComponent;

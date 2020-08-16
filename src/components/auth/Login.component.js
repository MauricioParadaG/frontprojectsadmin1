import React, {useState} from 'react';
import {Link} from 'react-router-dom';
// 
const LoginComponent = () => {

    const [loginFormData, setLoginFormDataState] = useState(
        {
           email:'',
           password:''
        }
      );

    const onChangeLogin = event => {
        setLoginFormDataState({
            ...loginFormData,
            // adding an ID - uuid library
            //id: uuid(),
            // adding the form info to the state
            [event.target.name]: event.target.value
        });
    }  

    const onSubmit = event => {
        event.preventDefault();
    }


    return (
        <div className="form-user">
            <div className="container-form shadow-dark">
                <h1>Login </h1>

                <form onSubmit={onSubmit}>
                    <div className="field-form">
                        <label htmlFor="email">Email</label>
                        <input type="email"
                        id="email"
                        name="email"
                        placeholder="Email"
                        value={loginFormData.email}
                        onChange={onChangeLogin}
                        />
                    </div>

                    <div className="field-form">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                        id="password"
                        name="password"
                        placeholder="*******"
                        value={loginFormData.password}
                        onChange={onChangeLogin}
                        />
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

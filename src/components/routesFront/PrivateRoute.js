import React, { useContext, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AuthContext from '../../context/loginsignup/authContext';

const PrivateRoute = ({ component: Component, ...props  }) => {

    const authContext = useContext(AuthContext);
    const { authenticate, loadingHOC, authenticateUser } = authContext;

    useEffect(() => {
        authenticateUser();
        // eslint-disable-next-line
    }, []);

    return ( 
        <Route { ...props } render={ props => !authenticate && !loadingHOC ?  
        (
            <Redirect to="/" />
        ) 
        : 
        (
            <Component {...props} />
        ) 
        } />

    );
}
 
export default PrivateRoute;
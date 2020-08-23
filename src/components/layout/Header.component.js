import React, { useContext, useEffect } from 'react';

import AuthContext from '../../context/loginsignup/authContext';

const HeaderComponent = () => {

    // getting the name of the authenticated user
    const authContext = useContext(AuthContext);
    const { user, authenticateUser, logoutUser } = authContext;

    useEffect(() => {
        authenticateUser();
        // eslint-disable-next-line
    }, [])

    return (
        <header className="app-header">
            {user ? 
            <p className="user-name">Hello <span>{user.name}</span> </p>
            : null}
            

            <nav className="nav-main">
                <button className="btn btn-blank logout"
                onClick={() => logoutUser()}
                >Logout</button>
            </nav>

        </header>
    )
}

export default HeaderComponent;

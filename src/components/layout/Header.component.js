import React from 'react';
// /
const HeaderComponent = () => {
    return (
        <header className="app-header">
            <p className="user-name">Hello <span>Mauricio</span> </p>

            <nav className="nav-main">
                <a href="#!">Logout</a>
            </nav>

        </header>
    )
}

export default HeaderComponent;

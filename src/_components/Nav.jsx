import React from 'react';
import { NavLink } from 'react-router-dom';

function Nav() {
    return (
        <nav className="navbar navbar-expand navbar-dark bg-dark">
            <div className="navbar-nav">
                <NavLink exact to="/" className="nav-item nav-link">Почетна</NavLink>
                <NavLink to="/users" className="nav-item nav-link">Картице</NavLink>
            </div>
        </nav>
    );
}

export { Nav };
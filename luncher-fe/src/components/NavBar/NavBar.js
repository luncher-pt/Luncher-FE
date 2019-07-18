import React from 'react';
import { NavLink } from "react-router-dom";
import './NavBar.css';

const NavBar = () => {
  return (
    <div className="NavBar">
      <NavLink
        exact={true}
        to="/"
        className="inactive"
        activeClassName="active"
      >
        Home
      </NavLink>
      <NavLink
        exact={true}
        to="/login"
        className="inactive"
        activeClassName="active"
      >
        Login
      </NavLink>
    </div>      
  );
};

export default NavBar;

import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import './NavBar.css';

const NavBar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
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
      {!isLoggedIn ? (
        <NavLink
          exact={true}
          to="/login"
          className="inactive"
          activeClassName="active"
        >
          Login
        </NavLink>
      ) : (
        <>
          <NavLink
            exact={true}
            to="/profile"
            className="inactive"
            activeClassName="active"
          >
            Profile
          </NavLink>
          <NavLink
            exact={true}
            to="/logout"
            className="inactive"
            activeClassName="active"
          >
            Logout
          </NavLink>
        </>
      )}
    </div>
  );
};

export default NavBar;

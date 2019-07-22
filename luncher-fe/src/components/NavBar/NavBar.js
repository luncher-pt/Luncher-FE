import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const NavBar = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const activeClass = `
    underline
  `;
  return (
    <div className="flex justify-center bg-blue-900 h-12 m-1">
      <div className="flex justify-between items-center bg-blue-300 h-full w-full rounded-sm px-3 py-1">
        <div className="text-blue-900">
          <NavLink to="/">Luncher</NavLink>
          <span className="border-r border-blue-900 w-0 mx-2 opacity-25" />
          <NavLink
            exact={true}
            to="/"
            className="h-full text-blue-900"
            activeClassName={activeClass}
          >
            Home
          </NavLink>
        </div>
        <div>
          {!isLoggedIn ? (
            <NavLink
              exact={true}
              to="/login"
              className="h-full text-blue-900"
              activeClassName={activeClass}
            >
              Login
            </NavLink>
          ) : (
            <>
              <NavLink
                exact={true}
                to="/profile"
                className="h-full text-blue-900"
                activeClassName={activeClass}
              >
                Profile
              </NavLink>
              <NavLink
                exact={true}
                to="/logout"
                className="h-full text-blue-900 ml-3"
                activeClassName={activeClass}
              >
                Logout
              </NavLink>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;

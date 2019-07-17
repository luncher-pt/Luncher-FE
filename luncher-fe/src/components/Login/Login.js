import React, { useReducer, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { registeringAction, loggingInAction } from '../../actions';

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [credentials, setCredentials] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
    }
  );

  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const handleInput = ({ target: { name, value } }) => {
    setCredentials({ [name]: value });
  };

  const { name, email, password } = credentials;

  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();
    // Todo: Login or register
    if (isRegistering) {
      dispatch(registeringAction(credentials));
    } else {
      dispatch(loggingInAction({ email, password }));
    }
    setCredentials({ name: '', email: '', password: '' });
  };

  const handleLoginOrRegister = loginOrRegister => {
    if (loginOrRegister === 'register') {
      setIsRegistering(true);
      setShowForm(true);
    } else {
      setIsRegistering(false);
      setShowForm(true);
    }
  };

  return (
    <div>
      {isLoggedIn === true && <Redirect to="/" />}
      {!showForm && (
        <div>
          <button onClick={() => handleLoginOrRegister('login')}>Login</button>{' '}
          <span> | </span>
          <button onClick={() => handleLoginOrRegister('register')}>
            Create Account
          </button>
        </div>
      )}
      {showForm && (
        <form onSubmit={handleSubmit}>
          {isRegistering && (
            <>
              <label htmlFor="name">Name</label>
              <input
                type="text"
                name="name"
                value={name}
                onChange={handleInput}
              />
            </>
          )}
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInput}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={password}
            onChange={handleInput}
          />
          <button>{isRegistering ? 'Register' : 'Login'}</button>
        </form>
      )}
    </div>
  );
};

export default Login;

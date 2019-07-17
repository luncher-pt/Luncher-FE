import React, { useReducer, useState } from 'react';
import { useDispatch } from 'react-redux';

import { registeringAction, loggingInAction } from '../../actions';

export const LoginRegisterForm = ({ isRegistering }) => {
  const [credentials, setCredentials] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
      schoolName: '',
      address: '',
      fundsRequired: 0,
    }
  );

  const handleInput = ({ target: { name, value } }) => {
    setCredentials({ [name]: value });
  };

  const {
    name,
    email,
    password,
    schoolName,
    address,
    fundsRequired,
  } = credentials;

  const dispatch = useDispatch();
  const handleSubmit = e => {
    e.preventDefault();

    if (isRegistering) {
      dispatch(registeringAction(credentials));
      console.log(credentials);
    } else {
      dispatch(loggingInAction({ email, password }));
    }
    setCredentials({ name: '', email: '', password: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" value={email} onChange={handleInput} />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={password}
          onChange={handleInput}
        />
        {isRegistering && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              value={name}
              onChange={handleInput}
            />
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              name="schoolName"
              value={schoolName}
              onChange={handleInput}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              value={address}
              onChange={handleInput}
            />
            <label htmlFor="fundsRequired">Funds Required</label>
            <input
              type="number"
              name="fundsRequired"
              value={fundsRequired}
              onChange={handleInput}
            />
          </>
        )}
        <button>{isRegistering ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
};

export default LoginRegisterForm;

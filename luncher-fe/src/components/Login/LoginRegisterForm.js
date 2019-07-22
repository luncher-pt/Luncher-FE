import React, { useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { registeringAction, loggingInAction } from '../../actions';

const LoginRegisterForm = ({ isRegistering }) => {
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
    } else {
      dispatch(loggingInAction({ email, password }));
    }
    setCredentials({ name: '', email: '', password: '' });
  };

  const inputStyle = `
    bg-blue-200 p-1
  `;

  return (
    <div className="">
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          className={inputStyle}
          value={email}
          onChange={handleInput}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={inputStyle}
          value={password}
          onChange={handleInput}
        />
        {isRegistering && (
          <>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              className={inputStyle}
              value={name}
              onChange={handleInput}
            />
            <label htmlFor="schoolName">School Name</label>
            <input
              type="text"
              name="schoolName"
              className={inputStyle}
              value={schoolName}
              onChange={handleInput}
            />
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              className={inputStyle}
              value={address}
              onChange={handleInput}
            />
            <label htmlFor="fundsRequired">Funds Required</label>
            <input
              type="number"
              name="fundsRequired"
              className={inputStyle}
              value={fundsRequired}
              onChange={handleInput}
            />
          </>
        )}
        <button className="flex-grow items-center justify-center cursor-pointer h-10 bg-blue-800 mt-1 text-blue-200 rounded-sm" >{isRegistering ? 'Register' : 'Login'}</button>
      </form>
    </div>
  );
};

export default LoginRegisterForm;

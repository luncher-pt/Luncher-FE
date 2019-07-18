import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

import LoginRegisterForm from './LoginRegisterForm';

const Login = () => {
  const isLoggedIn = useSelector(state => state.isLoggedIn);

  const [isRegistering, setIsRegistering] = useState(false);

  const handleLoginOrRegister = loginOrRegister => {
    if (loginOrRegister === 'register') {
      setIsRegistering(true);
    } else {
      setIsRegistering(false);
    }
  };

  return isLoggedIn ? (
    <Redirect to="/" />
  ) : (
    <div>
      <button onClick={() => handleLoginOrRegister('login')}>Login</button>{' '}
      <span> | </span>
      <button onClick={() => handleLoginOrRegister('register')}>
        Create Account
      </button>
      <LoginRegisterForm isRegistering={isRegistering} />
    </div>
  );
};

export default Login;

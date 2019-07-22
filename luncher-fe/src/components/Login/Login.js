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
    <div className="flex justify-center">
      <div className="bg-blue-300 mx-1 mt-3 rounded-sm p-1 w-1/2 text-blue-900">
        <div className="flex justify-center">
          <button
            className={!isRegistering && 'underline'}
            onClick={() => handleLoginOrRegister('login')}
          >
            Login
          </button>{' '}
          <span className="mx-2"> | </span>
          <button
            className={isRegistering && 'underline'}
            onClick={() => handleLoginOrRegister('register')}
          >
            Create Account
          </button>
        </div>
        <LoginRegisterForm isRegistering={isRegistering} />
      </div>
    </div>
  );
};

export default Login;

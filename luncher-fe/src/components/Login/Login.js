import React, { useReducer } from 'react';

const Login = () => {
  const [credentials, setCredentials] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      email: '',
      password: '',
    }
  );
  const handleInput = ({ target: { name, value } }) => {
    setCredentials({ [name]: value });
  };
  return (
    <div>
      <form>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" />
        <label htmlFor="email">Email</label>
        <input type="email" name="email" />
        <label htmlFor="password">Password</label>
        <input type="text" name="password" />
        <button>Register</button>
      </form>
    </div>
  );
};

export default Login;

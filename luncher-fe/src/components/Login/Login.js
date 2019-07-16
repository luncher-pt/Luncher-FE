import React from 'react';

const Login = () => {
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

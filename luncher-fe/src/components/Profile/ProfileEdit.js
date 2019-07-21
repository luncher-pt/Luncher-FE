import React, { useReducer, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { updatingUserAction } from '../../actions';

const ProfileEdit = () => {
  const { name, email, userId } = useSelector(state => state);
  const [userInput, setUserInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id: null,
      name: '',
      email: '',
      password: '',
      admin: true,
      donations: 0,
    }
  );

  useEffect(() => {
    setUserInput({ name, email, id: userId });
  }, [email, name, userId]);

  const handleInput = ({ target: { name, value } }) => {
    setUserInput({ [name]: value });
  };

  const dispatch = useDispatch();
  const handleSave = e => {
    e.preventDefault();
    dispatch(updatingUserAction(userInput));
  };

  return (
    <div>
      <div>Edit Profile</div>
      <form onSubmit={handleSave}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          name="name"
          value={userInput.name}
          onChange={handleInput}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={userInput.email}
          onChange={handleInput}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={userInput.password}
          onChange={handleInput}
        />
        <button onClick={handleSave}>Save</button>
      </form>
    </div>
  );
};

export default ProfileEdit;

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

  const inputContainer = `
  pt-1 bg-blue-200 shadow mb-1 rounded-sm px-2
  `;

  const inputStyle = `
  bg-blue-100 shadow mb-1 rounded-sm p-1
  `;

  const inputContainerLast = `
  pt-1 bg-blue-200 shadow rounded-sm px-2
  `;

  return (
    <div className="flex justify-center">
      <div className="bg-blue-300 mx-1 mb-1 rounded-sm p-1 w-full md:w-4/6 text-blue-900">
        <form onSubmit={handleSave}>
          <div className={inputContainer}>
            <label className="mr-2" htmlFor="name">
              Name
            </label>
            <input
              type="text"
              name="name"
              className={inputStyle}
              value={userInput.name}
              onChange={handleInput}
            />
          </div>
          <div className={inputContainer}>
            <label className="mr-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              name="email"
              className={inputStyle}
              value={userInput.email}
              onChange={handleInput}
            />
          </div>
          <div className={inputContainerLast}>
            <label className="mr-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              name="password"
              className={inputStyle}
              value={userInput.password}
              onChange={handleInput}
            />
          </div>
          <div className="flex w-full">
            <button
              className="flex-grow items-center justify-center cursor-pointer h-10 bg-blue-800 mt-1 text-blue-200 rounded-sm"
              onClick={handleSave}
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileEdit;

import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';

import { updatingSchoolAction, deletingSchoolAction } from '../../actions';

function School({
  school: { name, address, funds_required, funds_donated, admin_id, id },
  isLoggedIn,
  userId,
}) {
  const [isEditing, setIsEditing] = useState(false);

  const [schoolInput, setSchoolInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      id,
      name,
      address,
      funds_required,
      funds_donated,
      admin_id,
    }
  );

  const handleInput = ({ target: { name, value } }) => {
    setSchoolInput({ [name]: value });
  };

  const dispatch = useDispatch();
  const handleSave = () => {
    if (
      schoolInput.name !== name ||
      schoolInput.address !== address ||
      schoolInput.funds_required !== funds_required ||
      schoolInput.funds_donated !== funds_donated
    ) {
      dispatch(updatingSchoolAction(schoolInput));
    }
    setIsEditing(false);
  };

  const handleDelete = () => {
    dispatch(deletingSchoolAction(id));
    setIsEditing(false);
  };

  const schoolItem = `
  p-2 bg-blue-200 shadow mb-1 rounded-sm
  `;

  const schoolItemLast = `
  p-2 bg-blue-200 shadow
  `;

  const schoolItemInputContainer = `
  pt-1 bg-blue-200 shadow mb-1 rounded-sm px-2
  `;

  const schoolItemInput = `
  bg-blue-100 shadow mb-1 rounded-sm p-1
  `;

  return isLoggedIn ? (
    //For the school admin session
    <div className="bg-blue-300 mx-1 mb-1 rounded-sm p-1 w-full text-blue-900">
      <div className="">
        {!isEditing ? (
          <div>
            <p className={`${schoolItem} font-bold text-center`}>{name}</p>
            <p className={schoolItem}>
              <strong>Address: </strong>
              {address}
            </p>
            <p className={schoolItem}>
              <strong>Funds Required: </strong>
              {funds_required}
            </p>
            <p className={schoolItemLast}>
              <strong>Funds Donated: </strong>
              {funds_donated}
            </p>
          </div>
        ) : (
          <div className="flex flex-col">
            <div
              className={`${schoolItemInputContainer} flex items-center justify-center `}
            >
              <input
                type="text"
                name="name"
                className={schoolItemInput}
                value={schoolInput.name}
                onChange={handleInput}
              />
            </div>

            <div className={schoolItemInputContainer}>
              <strong>Address: </strong>
              <input
                type="text"
                className={schoolItemInput}
                value={schoolInput.address}
                name="address"
                onChange={handleInput}
              />
            </div>
            <div className={schoolItemInputContainer}>
              <strong>Funds Required: </strong>
              <input
                type="number"
                className={schoolItemInput}
                value={schoolInput.funds_required}
                name="funds_required"
                onChange={handleInput}
              />
            </div>
            <div className={schoolItemInputContainer}>
              <strong>Funds Donated: </strong>
              <input
                type="number"
                className={schoolItemInput}
                value={schoolInput.funds_donated}
                name="funds_donated"
                onChange={handleInput}
              />
            </div>
          </div>
        )}
      </div>
      {userId === admin_id && (
        <div className="flex w-full">
          <button
            title={!isEditing ? 'Edit' : 'Save'}
            className="flex-grow items-center justify-center cursor-pointer h-10 bg-blue-800 mt-1 text-blue-200 rounded-sm"
            onClick={!isEditing ? () => setIsEditing(true) : handleSave}
          >
            {!isEditing ? 'Edit' : 'Save'}
          </button>
          {isEditing && (
            <button
              title="Delete"
              className="flex-grow items-center justify-center cursor-pointer h-10 bg-red-800 mt-1 text-blue-200 ml-1 rounded-sm"
              onClick={handleDelete}
            >
              Delete
            </button>
          )}
        </div>
      )}
    </div>
  ) : (
    //For the donor session
    <div className="School">
      <p className="SchoolName">{name}</p>
      <ul>
        <li>
          <strong>Address: </strong>
          {address}
        </li>
        <li>
          <strong>Funds Required: </strong>
          {funds_required}
        </li>
      </ul>
    </div>
  );
}

export default School;

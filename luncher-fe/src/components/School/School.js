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
  flex-grow p-2 bg-blue-200 shadow mb-1 rounded-sm
  `;

  const schoolItemLast = `
  flex-grow p-2 bg-blue-200 shadow rounded-sm
  `;

  const schoolItemInputContainer = `
  flex items-center pt-1 bg-blue-200 shadow mb-1 rounded-sm px-2
  `;

  const schoolItemInputContainerLast = `
  flex items-center pt-1 bg-blue-200 shadow mb-1 rounded-sm px-2 pb-1
  `;

  const schoolItemInput = `
  bg-blue-100 shadow mb-1 rounded-sm p-1 ml-1
  `;

  const schoolItemInputLast = `
  bg-blue-100 shadow rounded-sm p-1 ml-1
  `;

  return (
    <div className="flex flex-grow bg-blue-300 pt-1 mx-1 rounded-sm mb-1 w-full md:w-5/12 lg:w-1/4 w-full md:w-5/12">
      <div className="flex-grow bg-blue-500 mx-1 mb-1 rounded-sm p-1 text-blue-900 shadow-lg">
        <div className="">
          {!isEditing ? (
            <div className="flex flex-col">
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
              <div className={schoolItemInputContainerLast}>
                <strong>Funds Donated: </strong>
                <input
                  type="number"
                  className={schoolItemInputLast}
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
    </div>
  );
}

export default School;

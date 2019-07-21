import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import './School.css';

import { updatingSchoolAction } from '../../actions';

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
  return isLoggedIn ? (
    //For the school admin session
    <div className="School">
      {!isEditing ? (
        <div>
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
            <li>
              <strong>Funds Donated: </strong>
              {funds_donated}
            </li>
            <li>
              <strong>Admin user: </strong>
              {admin_id}
            </li>
          </ul>
        </div>
      ) : (
        <div>
          <input
            type="text"
            name="name"
            value={schoolInput.name}
            onChange={handleInput}
          />

          <ul>
            <li>
              <strong>Address: </strong>
              <input
                type="text"
                value={schoolInput.address}
                name="address"
                onChange={handleInput}
              />
            </li>
            <li>
              <strong>Funds Required: </strong>
              <input
                type="number"
                value={schoolInput.funds_required}
                name="funds_required"
                onChange={handleInput}
              />
            </li>
            <li>
              <strong>Funds Donated: </strong>
              <input
                type="number"
                value={schoolInput.funds_donated}
                name="funds_donated"
                onChange={handleInput}
              />
            </li>
          </ul>
        </div>
      )}
      {userId === admin_id && (
        <div className="SchoolActions">
          <p
            title="Update"
            className="UpdateButton"
            onClick={!isEditing ? () => setIsEditing(true) : handleSave}
          >
            {!isEditing ? 'Edit' : 'Save'}
          </p>
          {isEditing && (
            <p title="Delete" className="DeleteButton" onClick={() => {}}>
              Delete
            </p>
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

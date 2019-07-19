import React, { useState, useReducer } from 'react';
import { useDispatch } from 'react-redux';
import './School.css';

import { updatingSchoolAction } from '../../actions';

const SchoolAdmin = ({
  school: { name, address, funds_required, funds_donated, admin_id, id },
  isLoggedIn,
}) => {
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
    dispatch(updatingSchoolAction(schoolInput));
    setIsEditing(false);
  };

  return !isEditing ? (
    //For the school admin session
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
        <li>
          <strong>Funds Donated: </strong>
          {funds_donated}
        </li>
      </ul>
      <div className="SchoolActions">
        <p
          title="Update"
          className="UpdateButton"
          onClick={() => setIsEditing(true)}
        >
          Update
        </p>
        <p title="Delete" className="DeleteButton" onClick={() => {}}>
          Delete
        </p>
      </div>
    </div>
  ) : (
    <div className="School">
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
      <div className="SchoolActions">
        <p title="Update" className="UpdateButton" onClick={handleSave}>
          Save
        </p>
        <p title="Delete" className="DeleteButton" onClick={() => {}}>
          Delete
        </p>
      </div>
    </div>
  );
};

export default SchoolAdmin;

import React, { useState, useReducer } from 'react';
import './School.css';

const SchoolAdmin = ({
  school: { name, address, funds_required, funds_donated, admin_id },
  isLoggedIn,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const [schoolInput, setSchoolInput] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      address: '',
      funds_required: '',
      funds_donated: '',
    }
  );

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
        <li>
          <strong>Admin user: </strong>
          {admin_id}
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
      <div className="SchoolActions">
        <p title="Update" className="UpdateButton" onClick={() => {}}>
          Update
        </p>
        <p title="Delete" className="DeleteButton" onClick={() => {}}>
          Delete
        </p>
      </div>
    </div>
  );
};

export default SchoolAdmin;

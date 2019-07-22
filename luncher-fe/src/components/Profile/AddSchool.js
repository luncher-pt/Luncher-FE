import React, { useReducer, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { addingSchoolAction, fetchingSchoolsAction } from '../../actions';

const AddSchool = ({ setTab }) => {
  const userId = useSelector(state => state.userId);
  const [schoolInfo, setSchoolInfo] = useReducer(
    (state, newState) => ({ ...state, ...newState }),
    {
      name: '',
      address: '',
      funds_required: 0,
      admin_id: null,
      funds_donated: 0,
    }
  );

  useEffect(() => {
    setSchoolInfo({ admin_id: userId });
  }, [userId]);

  const handleInput = ({ target: { name, value } }) => {
    setSchoolInfo({ [name]: value });
  };

  const { name, address, funds_required } = schoolInfo;

  const dispatch = useDispatch();
  const handleSubmit = async e => {
    e.preventDefault();
    await dispatch(addingSchoolAction(schoolInfo));
    await dispatch(fetchingSchoolsAction());
    setTab('schools');
  };

  const inputStyle = `
    bg-blue-200 p-1
  `;

  const buttonStyle = `
    flex-grow items-center justify-center cursor-pointer h-10 bg-blue-800
    mt-1 text-blue-200 rounded-sm
  `;

  return (
    <div className="flex justify-center">
      <div className="bg-blue-300 mx-1 mt-1 rounded-sm p-1 w-1/2 text-blue-900">
        <form className="flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            className={inputStyle}
            value={name}
            onChange={handleInput}
          />
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            className={inputStyle}
            value={address}
            onChange={handleInput}
          />
          <label htmlFor="funds_required">Funds Required</label>
          <input
            type="number"
            name="funds_required"
            className={inputStyle}
            value={funds_required}
            onChange={handleInput}
          />
          <button onClick={handleSubmit} className={buttonStyle}>
            Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddSchool;

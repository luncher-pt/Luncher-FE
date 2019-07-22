import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchingSchoolsAction } from '../../actions';
import School from '../School/School';
import ProfileEdit from './ProfileEdit';

const Admin = () => {
  const { userId, schools, isLoggedIn, fetchingSchools, error } = useSelector(
    state => state
  );

  const [tab, setTab] = useState('schools');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingSchoolsAction());
  }, [dispatch]);

  const mySchools = schools.filter(school => school.admin_id === userId);

  const tabStyleActive = `
    bg-blue-200 text-blue-900 p-2 rounded-sm border border-blue-900 mr-2
  `;

  const tabStyleDefault = `
    bg-blue-200 text-blue-900 p-2 rounded-sm mr-2
  `;

  return (
    <div>
      <div className="flex items-center bg-blue-300 mb-1 mx-1 rounded-sm p-2">
        <button
          className={tab === 'schools' ? tabStyleActive : tabStyleDefault}
          onClick={() => setTab('schools')}
        >
          My Schools
        </button>
        <button
          className={tab === 'profile' ? tabStyleActive : tabStyleDefault}
          onClick={() => setTab('profile')}
        >
          Edit Profile
        </button>
      </div>
      {!localStorage.token && <Redirect to="/login" />}
      {tab === 'schools' && (
        <div className="flex">
          {!fetchingSchools ? (
            mySchools.map(school => (
              <School
                key={school.id}
                school={school}
                isLoggedIn={isLoggedIn}
                userId={userId}
              />
            ))
          ) : (
            <h4 className="Message">Fetching school information ...</h4>
          )}
          {error && <p className="error"> {error} </p>}
        </div>
      )}
      {tab === 'profile' && <ProfileEdit />}
    </div>
  );
};

export default Admin;

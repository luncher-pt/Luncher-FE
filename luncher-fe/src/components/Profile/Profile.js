import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchingSchoolsAction } from '../../actions';
import School from '../School/School';
import ProfileEdit from './ProfileEdit';

const Admin = () => {
  const { userId, schools, isLoggedIn, fetchingSchools, error } = useSelector(
    state => state
  );

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchingSchoolsAction());
  }, [dispatch]);

  const mySchools = schools.filter(school => school.admin_id === userId);

  return (
    <div>
      {!localStorage.token && <Redirect to="/login" />}
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
      <div>Profile Information</div>
      <ProfileEdit />
    </div>
  );
};

export default Admin;

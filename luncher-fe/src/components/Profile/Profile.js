import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { fetchingSchoolsAction } from '../../actions';
import School from '../School/School';

const Admin = () => {
  const { userId, schools, isLoggedIn, fetchingSchools, error } = useSelector(
    state => state
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (schools.length === 0) {
      dispatch(fetchingSchoolsAction());
    }
  }, [schools, dispatch]);

  const mySchools = schools.filter(school => school.admin_id === userId);

  return (
    <div>
      {!localStorage.token && <Redirect to="/login" />}
      <div>Admin</div>
      <div>My Schools</div>
      <div>
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
    </div>
  );
};

export default Admin;

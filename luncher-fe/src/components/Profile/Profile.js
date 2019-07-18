import React, { useEffect } from 'react';
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
  }, [schools]);

  const mySchools = schools.filter(school => school.admin_id === userId);

  return (
    <div>
      <div>Admin</div>
      <div>My Schools</div>
      <div>
        {!fetchingSchools ? (
          mySchools.map(school => (
            <School
              key={school.id}
              school={school}
              // editHandler={this.editHandler}
              // deleteHandler={this.deleteHandler}
              isLoggedIn={isLoggedIn}
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

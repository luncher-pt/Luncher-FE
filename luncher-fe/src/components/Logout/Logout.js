import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { loggingOutAction } from '../../actions';

const Logout = () => {
  const dispatch = useDispatch();
  dispatch(loggingOutAction());
  return (
    <div>
      <Redirect to="/" />
    </div>
  );
};

export default Logout;

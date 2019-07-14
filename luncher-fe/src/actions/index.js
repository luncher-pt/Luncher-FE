import axios from 'axios';

export const FETCHING_SCHOOLS = 'FETCHING_SCHOOLS';
export const FETCHING_SCHOOLS_SUCCESS = 'FETCHING_SCHOOLS_SUCCESS';
export const FETCHING_SCHOOLS_FAILURE = 'FETCHING_SCHOOLS_FAILURE';

export const ADDING_SCHOOL = 'ADDING_SCHOOL';
export const ADDING_SCHOOL_SUCCESS = 'ADDING_SCHOOL_SUCCESS';
export const ADDING_SCHOOL_FAILURE = 'ADDING_SCHOOL_FAILURE';

export const DELETING_SCHOOL = 'DELETING_SCHOOL';
export const DELETING_SCHOOL_SUCCESS = 'DELETING_SCHOOL_SUCCESS';
export const DELETING_SCHOOL_FAILURE = 'DELETING_SCHOOL_FAILURE';

export const UPDATING_SCHOOL = 'UPDATING_SCHOOL';
export const UPDATING_SCHOOL_SUCCESS = 'UPDATING_SCHOOL_SUCCESS';
export const UPDATING_SCHOOL_FAILURE = 'UPDATING_SCHOOL_FAILURE';

export const fetchingSchoolsAction = () => dispatch => {
  dispatch({ type: FETCHING_SCHOOLS });
  return axios
    .get('http://<TBD>:<TBD>/schools', {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then(resp =>
      dispatch({ type: FETCHING_SCHOOLS_SUCCESS, payload: resp.data })
    )
    .catch(err =>
      dispatch({ type: FETCHING_SCHOOLS_FAILURE, error: err.message })
    );
};

export const addingSchoolAction = newSchool => dispatch => {
  dispatch({ type: ADDING_SCHOOL });
  return axios
    .post('http://<TBD>:<TBD>/schools', newSchool, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then(resp => dispatch({ type: ADDING_SCHOOL_SUCCESS, payload: resp.data }))
    .catch(err =>
      dispatch({ type: ADDING_SCHOOL_FAILURE, error: err.message })
    );
};

export const deletingSchoolAction = id => dispatch => {
  dispatch({ type: DELETING_SCHOOL });
  return axios
    .delete(`http://<TBD>:<TBD>/schools/${id}`, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then(resp =>
      dispatch({ type: DELETING_SCHOOL_SUCCESS, payload: resp.data })
    )
    .catch(err =>
      dispatch({ type: DELETING_SCHOOL_FAILURE, error: err.message })
    );
};

export const updatingSchoolAction = updatedSchool => dispatch => {
  dispatch({ type: UPDATING_SCHOOL });
  return axios
    .put(`http://localhost:5000/schools/${updatedSchool.id}`, updatedSchool, {
      headers: { Authorization: localStorage.getItem('token') },
    })
    .then(resp =>
      dispatch({ type: UPDATING_SCHOOL_SUCCESS, payload: resp.data })
    )
    .catch(err =>
      dispatch({ type: UPDATING_SCHOOL_FAILURE, error: err.message })
    );
};

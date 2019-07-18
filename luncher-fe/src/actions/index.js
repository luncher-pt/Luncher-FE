import axios from 'axios';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCESS';
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE';

export const REGISTERING = 'REGISTERING';
export const REGISTERING_SUCCESS = 'REGISTERING_SUCCESS';
export const REGISTERING_FAILURE = 'REGISTERING_FAILURE';

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

const API_URL = 'http://luncher-lambda-buildweek.herokuapp.com';

export const axiosWithAuth = () => {
  const token = localStorage.getItem('token');

  return axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authentication: `${token}`,
    },
    baseURL: API_URL,
  });
};

export const loggingInAction = creds => dispatch => {
  dispatch({ type: LOGGING_IN });
  return axios
    .post(`${API_URL}/login`, creds)
    .then(resp => {
      localStorage.setItem('token', resp.data.token);
      dispatch({ type: LOGGING_IN_SUCCESS });
      return resp.data;
    })
    .catch(err => dispatch({ type: LOGGING_IN_FAILURE, error: err.error }));
};

export const registeringAction = ({
  email,
  password,
  name,
  schoolName,
  address,
  fundsRequired,
}) => dispatch => {
  dispatch({ type: REGISTERING });
  return axios
    .post(`${API_URL}/register`, {
      name,
      email,
      password,
      admin: true,
      donations: 0,
    })
    .then(async res => {
      dispatch({ type: REGISTERING_SUCCESS });
      dispatch({ type: LOGGING_IN });
      await axios
        .post(`${API_URL}/login`, {
          email,
          password,
        })
        .then(resp => {
          localStorage.setItem('token', resp.data.token);
          console.log(resp);
          dispatch({ type: ADDING_SCHOOL });
          axiosWithAuth()
            .post(`/schools`, {
              name: schoolName,
              address: address,
              funds_required: fundsRequired,
              funds_donated: 0,
              admin_id: resp.data.id,
            })
            .then(resp =>
              dispatch({
                type: ADDING_SCHOOL_SUCCESS,
                payload: {
                  name: schoolName,
                  address: address,
                  funds_required: fundsRequired,
                  funds_donated: 0,
                  admin_id: resp.data.id,
                },
              })
            )
            .catch(err =>
              dispatch({ type: ADDING_SCHOOL_FAILURE, error: err.message })
            );
          dispatch({ type: LOGGING_IN_SUCCESS });
        })
        .catch(err => dispatch({ type: LOGGING_IN_FAILURE, error: err.error }));
      // dispatch(
      //   loggingInAction({ email: creds.email, password: creds.password })
      // );
    })
    .catch(err => {
      dispatch({ type: REGISTERING_FAILURE, error: err });
    });
};

export const fetchingSchoolsAction = () => dispatch => {
  dispatch({ type: FETCHING_SCHOOLS });
  return axios
    .get(`${API_URL}/schools`, {
      headers: { Authentication: localStorage.getItem('token') },
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
    .post(`${API_URL}/schools`, newSchool, {
      headers: { Authentication: localStorage.getItem('token') },
    })
    .then(resp => dispatch({ type: ADDING_SCHOOL_SUCCESS, payload: resp.data }))
    .catch(err =>
      dispatch({ type: ADDING_SCHOOL_FAILURE, error: err.message })
    );
};

export const deletingSchoolAction = id => dispatch => {
  dispatch({ type: DELETING_SCHOOL });
  return axios
    .delete(`${API_URL}/schools/${id}`, {
      headers: { Authentication: localStorage.getItem('token') },
    })
    .then(resp =>
      dispatch({ type: DELETING_SCHOOL_SUCCESS, payload: id })
    )
    .catch(err =>
      dispatch({ type: DELETING_SCHOOL_FAILURE, error: err.message })
    );
};

export const updatingSchoolAction = updatedSchool => dispatch => {
  dispatch({ type: UPDATING_SCHOOL });
  return axios
    .put(
      `${API_URL}/schools/${updatedSchool.id}`,
      updatedSchool,
      {
        headers: { Authentication: localStorage.getItem('token') },
      }
    )
    .then(resp =>
      dispatch({ type: UPDATING_SCHOOL_SUCCESS, payload: resp.data })
    )
    .catch(err =>
      dispatch({ type: UPDATING_SCHOOL_FAILURE, error: err.message })
    );
};

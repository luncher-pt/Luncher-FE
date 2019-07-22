import axios from 'axios';
import jwt_decode from 'jwt-decode';

export const LOGGING_IN = 'LOGGING_IN';
export const LOGGING_IN_SUCCESS = 'LOGGING_IN_SUCCESS';
export const LOGGING_IN_FAILURE = 'LOGGING_IN_FAILURE';

export const LOGGING_OUT = 'LOGGING_OUT';

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

export const UPDATING_USER = 'UPDATING_USER';
export const UPDATING_USER_SUCCESS = 'UPDATING_USER_SUCCESS';
export const UPDATING_USER_FAILURE = 'UPDATING_USER_FAILURE';

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

export const checkLogin = () => async dispatch => {
  if (localStorage.token) {
    const user = await axiosWithAuth()
      .get(`${API_URL}/users/${jwt_decode(localStorage.token).id}`)
      .then(res => {
        return res;
      })
      .catch(err => dispatch({ type: LOGGING_IN_FAILURE, error: err.error }));
    dispatch({
      type: LOGGING_IN_SUCCESS,
      payload: user.data,
    });
  }
};

export const loggingInAction = creds => dispatch => {
  dispatch({ type: LOGGING_IN });
  return axios
    .post(`${API_URL}/login`, creds)
    .then(resp => {
      localStorage.setItem('token', resp.data.token);
      dispatch(checkLogin());
      return resp.data;
    })
    .catch(err => dispatch({ type: LOGGING_IN_FAILURE, error: err.error }));
};

export const loggingOutAction = () => dispatch => {
  localStorage.removeItem('token');
  dispatch({ type: LOGGING_OUT });
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
        .then(async resp => {
          localStorage.setItem('token', resp.data.token);
          dispatch({ type: ADDING_SCHOOL });
          await axiosWithAuth()
            .post(`/schools`, {
              name: schoolName,
              address: address,
              funds_required: fundsRequired,
              funds_donated: 0,
              admin_id: resp.data.id,
            })
            .then(resp => dispatch({ type: ADDING_SCHOOL_SUCCESS }))
            .catch(err =>
              dispatch({ type: ADDING_SCHOOL_FAILURE, error: err.message })
            );
        })
        .catch(err => dispatch({ type: LOGGING_IN_FAILURE, error: err.error }));

      dispatch({ type: LOGGING_IN_SUCCESS });
    })
    .catch(err => {
      dispatch({ type: REGISTERING_FAILURE, error: err.error });
    });
};

export const updatingUserAction = ({ id, ...user }) => dispatch => {
  dispatch({ type: UPDATING_USER });
  axiosWithAuth()
    .put(`${API_URL}/users/${id}`, user)
    .then(res => {
      dispatch({ type: UPDATING_USER_SUCCESS, payload: res.data[0] });
    })
    .catch(err => {
      dispatch({ type: UPDATING_USER_FAILURE, payload: err.message });
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

export const addingSchoolAction = ({
  name,
  address,
  funds_required,
  funds_donated,
  admin_id,
}) => async dispatch => {
  dispatch({ type: ADDING_SCHOOL });
  console.log({
    name,
    address,
    funds_required,
    funds_donated,
    admin_id,
  });
  return await axiosWithAuth()
    .post(`/schools`, {
      name,
      address,
      funds_required,
      admin_id,
      funds_donated,
    })
    .then(resp => dispatch({ type: ADDING_SCHOOL_SUCCESS }))
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
      dispatch({ type: DELETING_SCHOOL_SUCCESS, payload: parseInt(resp.data) })
    )
    .catch(err =>
      dispatch({ type: DELETING_SCHOOL_FAILURE, error: err.message })
    );
};

export const updatingSchoolAction = ({
  name,
  address,
  funds_required,
  funds_donated,
  admin_id,
  id,
}) => dispatch => {
  dispatch({ type: UPDATING_SCHOOL });
  return axiosWithAuth()
    .put(`${API_URL}/schools/${id}`, {
      name,
      address,
      funds_required,
      funds_donated,
      admin_id,
    })
    .then(resp => {
      dispatch({ type: UPDATING_SCHOOL_SUCCESS, payload: resp.data[0] });
    })
    .catch(err =>
      dispatch({ type: UPDATING_SCHOOL_FAILURE, error: err.message })
    );
};

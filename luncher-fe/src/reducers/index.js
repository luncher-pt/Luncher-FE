import { LOGGING_IN, LOGGING_IN_SUCCESS, LOGGING_IN_FAILURE } from '../actions';
import {
  FETCHING_SCHOOLS,
  FETCHING_SCHOOLS_SUCCESS,
  FETCHING_SCHOOLS_FAILURE,
} from '../actions';
import {
  ADDING_SCHOOL,
  ADDING_SCHOOL_SUCCESS,
  ADDING_SCHOOL_FAILURE,
} from '../actions';
import {
  DELETING_SCHOOL,
  DELETING_SCHOOL_SUCCESS,
  DELETING_SCHOOL_FAILURE,
} from '../actions';
import {
  UPDATING_SCHOOL,
  UPDATING_SCHOOL_SUCCESS,
  UPDATING_SCHOOL_FAILURE,
} from '../actions';
import {
  REGISTERING,
  REGISTERING_SUCCESS,
  REGISTERING_FAILURE,
} from '../actions';

const initialState = {
  loggingIn: false,
  isLoggedIn: false,
  userId: null,
  registering: false,
  fetchingSchools: false,
  schools: [],
  addingSchool: false,
  deletingSchool: false,
  updatingSchool: false,
  error: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING_IN:
      state = { ...state, loggingIn: true };
      break;
    case LOGGING_IN_SUCCESS:
      state = {
        ...state,
        loggingIn: false,
        isLoggedIn: true,
        userId: action.payload.id,
      };
      break;
    case LOGGING_IN_FAILURE:
      state = { ...state, loggingIn: false, error: action.error };
      break;

    case REGISTERING:
      return {
        ...state,
        registering: true,
      };
    case REGISTERING_SUCCESS:
      return {
        ...state,
        registering: false,
      };
    case REGISTERING_FAILURE:
      return {
        ...state,
        registering: false,
        error: action.error,
      };

    case FETCHING_SCHOOLS:
      state = { ...state, fetchingSchools: true };
      break;
    case FETCHING_SCHOOLS_SUCCESS:
      state = { ...state, fetchingSchools: false, schools: action.payload };
      break;
    case FETCHING_SCHOOLS_FAILURE:
      state = { ...state, fetchingSchools: false, error: action.error };
      break;

    case ADDING_SCHOOL:
      state = { ...state, addingSchool: true };
      break;
    case ADDING_SCHOOL_SUCCESS:
      state = {
        ...state,
        addingSchool: false,
      };
      break;
    case ADDING_SCHOOL_FAILURE:
      state = { ...state, addingSchool: false, error: action.error };
      break;

    case DELETING_SCHOOL:
      state = { ...state, deletingSchool: true };
      break;
    case DELETING_SCHOOL_SUCCESS:
      state = {
        ...state,
        deletingSchool: false,
        schools: state.schools.filter(s => s.id != action.payload),
      };
      break;
    case DELETING_SCHOOL_FAILURE:
      state = { ...state, deletingSchool: false, error: action.error };
      break;

    case UPDATING_SCHOOL:
      state = { ...state, updatingSchool: true };
      break;
    case UPDATING_SCHOOL_SUCCESS:
      state = {
        ...state,
        updatingSchool: false,
        schools: [
          ...state.schools.filter(school => school.id !== action.payload.id),
          action.payload,
        ],
      };
      break;
    case UPDATING_SCHOOL_FAILURE:
      state = { ...state, updatingSchool: false, error: action.error };
      break;

    default:
      break;
  }
  return state;
};

export default reducer;

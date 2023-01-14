import {
  GET_RCIRCULAR_FAILED,
  GET_RCIRCULAR_REQUEST,
  GET_RCIRCULAR_SUCCESS,
  POST_CIRCULAR_FAILED,
  POST_CIRCULAR_REQUEST,
  POST_CIRCULAR_SUCCESS,
  POST_CIRCULAR_RESET,
  CIRCULAR_DELETE_REQUEST,
  CIRCULAR_DELETE_SUCCESS,
  CIRCULAR_DELETE_FAILED,
  CIRCULAR_DELETE_RESET,
  CIRCULAR_EDIT_REQUEST,
  CIRCULAR_EDIT_SUCCESS,
  CIRCULAR_EDIT_FAILED,
  CIRCULAR_EDIT_RESET,
  JOB_APPLY_REQUEST,
  JOB_APPLY_SUCCESS,
  JOB_APPLY_FAILED,
  JOB_APPLY_RESET,
  GET_JOB_APPLICANT_REQUEST,
  GET_JOB_APPLICANT_SUCCESS,
  GET_JOB_APPLICANT_FAILED,
} from '../ActionTypes';

export const getRCircularReducer = (state = { circulars: [] }, action) => {
  switch (action.type) {
    case GET_RCIRCULAR_REQUEST:
      return { loading: true };
    case GET_RCIRCULAR_SUCCESS:
      return { loading: false, circulars: action.payload };
    case GET_RCIRCULAR_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const postCircularReducer = (state = {}, action) => {
  switch (action.type) {
    case POST_CIRCULAR_REQUEST:
      return { loading: true };
    case POST_CIRCULAR_SUCCESS:
      return { loading: false, success: true };
    case POST_CIRCULAR_FAILED:
      return { loading: false, error: action.payload };
    case POST_CIRCULAR_RESET:
      return {};
    default:
      return state;
  }
};
export const circularDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CIRCULAR_DELETE_REQUEST:
      return { loading: true };
    case CIRCULAR_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CIRCULAR_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case CIRCULAR_DELETE_RESET:
      return {};
    default:
      return state;
  }
};
export const circularEditReducer = (state = {}, action) => {
  switch (action.type) {
    case CIRCULAR_EDIT_REQUEST:
      return { loading: true };
    case CIRCULAR_EDIT_SUCCESS:
      return { loading: false, success: true };
    case CIRCULAR_EDIT_FAILED:
      return { loading: false, error: action.payload };
    case CIRCULAR_EDIT_RESET:
      return {};
    default:
      return state;
  }
};
export const jobApplyReducer = (state = {}, action) => {
  switch (action.type) {
    case JOB_APPLY_REQUEST:
      return { loading: true };
    case JOB_APPLY_SUCCESS:
      return { loading: false, success: true };
    case JOB_APPLY_FAILED:
      return { loading: false, error: action.payload };
    case JOB_APPLY_RESET:
      return {};
    default:
      return state;
  }
};
export const jobApplicantReducer = (state = { applicants: [] }, action) => {
  switch (action.type) {
    case GET_JOB_APPLICANT_REQUEST:
      return { loading: true };
    case GET_JOB_APPLICANT_SUCCESS:
      return { loading: false, applicants: action.payload };
    case GET_JOB_APPLICANT_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

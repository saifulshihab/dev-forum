import {
  REC_SIGNUP_REQUEST,
  REC_SIGNUP_SUCCESS,
  REC_SIGNUP_FAILED,
  REC_SIGNIN_REQUEST,
  REC_SIGNIN_FAILED,
  REC_SIGNIN_SUCCESS,
  REC_SIGNOUT,
  GET_RECRUITER_PROJECTS_REQUEST,
  GET_RECRUITER_PROJECTS_SUCCESS,
  GET_RECRUITER_PROJECTS_FAILED,
  PROJECT_POST_REQUEST,
  PROJECT_POST_SUCCESS,
  PROJECT_POST_FAILED,
  PROJECT_POST_RESET,
} from '../ActionTypes';

export const recrSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case REC_SIGNUP_REQUEST:
      return { loading: true };
    case REC_SIGNUP_SUCCESS:
      return { loading: false, success: true };
    case REC_SIGNUP_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const recrSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case REC_SIGNIN_REQUEST:
      return { loading: true };
    case REC_SIGNIN_SUCCESS:
      return {
        loading: false,
        recInfo: action.payload,
        isAuthenticated: true,
      };
    case REC_SIGNIN_FAILED:
      return { loading: false, error: action.payload, isAuthenticated: false };
    case REC_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const devSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case REC_SIGNUP_REQUEST:
      return { loading: true };
    case REC_SIGNUP_SUCCESS:
      return { loading: false, success: true };
    case REC_SIGNUP_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getRecProjectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case GET_RECRUITER_PROJECTS_REQUEST:
      return { loading: true };
    case GET_RECRUITER_PROJECTS_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_RECRUITER_PROJECTS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const postProjectReducer = (state = {}, action) => {
  switch (action.type) {
    case PROJECT_POST_REQUEST:
      return { loading: true };
    case PROJECT_POST_SUCCESS:
      return { loading: false, success: true };
    case PROJECT_POST_FAILED:
      return { loading: false, error: action.payload };
    case PROJECT_POST_RESET:
      return {};
    default:
      return state;
  }
};

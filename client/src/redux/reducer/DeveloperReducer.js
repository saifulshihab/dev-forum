import {
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
  DEV_SIGNUP_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNOUT,
  GET_DEV_PROFILE_REQUEST,
  GET_DEV_PROFILE_SUCCESS,
  GET_DEV_PROFILE_FAIL,
  GET_DEV_PROFILE_RESET,
  DEV_PROFILE_DELETE_REQUEST,
  DEV_PROFILE_DELETE_SUCCESS,
  DEV_PROFILE_DELETE_FAIL,
  DEV_PROFILE_DELETE_RESET,
  DEV_PROFILE_EDIT_REQUEST,
  DEV_PROFILE_EDIT_SUCCESS,
  DEV_PROFILE_EDIT_FAIL,
  DEV_PROFILE_EDIT_RESET,
} from '../ActionTypes';

export const devSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_SIGNUP_REQUEST:
      return { loading: true };
    case DEV_SIGNUP_SUCCESS:
      return { loading: false, success: true };
    case DEV_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const devSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_SIGNIN_REQUEST:
      return { loading: true };
    case DEV_SIGNIN_SUCCESS:
      return {
        loading: false,
        devInfo: action.payload,
        isAuthenticated: true,
      };
    case DEV_SIGNIN_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    case DEV_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const devProfileReducer = (
  state = { user: { social: [], education: [], experience: [] } },
  action
) => {
  switch (action.type) {
    case GET_DEV_PROFILE_REQUEST:
      return { loading: true };
    case GET_DEV_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_DEV_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_DEV_PROFILE_RESET:
      return { user: { social: [], education: [], experience: [] } };
    default:
      return state;
  }
};

export const devProfileDelReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_PROFILE_DELETE_REQUEST:
      return { loading: true };
    case DEV_PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEV_PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEV_PROFILE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const devProfileEditReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_PROFILE_EDIT_REQUEST:
      return { loading: true };
    case DEV_PROFILE_EDIT_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case DEV_PROFILE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case DEV_PROFILE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

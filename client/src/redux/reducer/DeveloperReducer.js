import {
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
  DEV_SIGNUP_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNOUT,
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

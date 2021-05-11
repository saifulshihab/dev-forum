import {
  REC_SIGNUP_REQUEST,
  REC_SIGNUP_SUCCESS,
  REC_SIGNUP_FAILED,
  REC_SIGNIN_REQUEST,
  REC_SIGNIN_FAILED,
  REC_SIGNIN_SUCCESS,
  REC_SIGNOUT,
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

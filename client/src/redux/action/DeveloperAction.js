import axios from 'axios';
// import { baseURL } from '../../baseURL';
import {
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNUP_FAIL,
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
} from '../ActionTypes';

// Developer signup
export const devSignup = (dev) => async (dispatch) => {
  try {
    dispatch({
      type: DEV_SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    await axios.post('api/dev/signup', { dev }, config);
    dispatch({
      type: DEV_SIGNUP_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: DEV_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Developer signin
export const devSignin = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: DEV_SIGNIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const { data } = await axios.post('api/dev/signin', { credentials }, config);
    dispatch({
      type: DEV_SIGNIN_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DEV_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

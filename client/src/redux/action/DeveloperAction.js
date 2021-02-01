import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNOUT,
  DEV_SIGNUP_FAIL,
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
  GET_DEV_PROFILE_FAIL,
  GET_DEV_PROFILE_REQUEST,
  GET_DEV_PROFILE_SUCCESS,
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
    await axios.post(`${baseURL}/api/dev/signup`, { dev }, config);
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
    const { data } = await axios.post(
      `${baseURL}/api/dev/signin`,
      { credentials },
      config
    );
    dispatch({
      type: DEV_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('devInfo', JSON.stringify(data));
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

// Developer signout
export const devSignout = () => async (dispatch) => {
  localStorage.removeItem('devInfo');
  dispatch({ type: DEV_SIGNOUT });
};

// Fetch developer profile
export const fetchDevProfile = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DEV_PROFILE_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseURL}/api/dev/${username}`, config);
    dispatch({
      type: GET_DEV_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEV_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

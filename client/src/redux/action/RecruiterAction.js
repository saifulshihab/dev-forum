import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  REC_SIGNIN_REQUEST,
  REC_SIGNIN_SUCCESS,
  REC_SIGNIN_FAILED,
  REC_SIGNOUT,
  REC_SIGNUP_REQUEST,
  REC_SIGNUP_SUCCESS,
  REC_SIGNUP_FAILED,
} from '../ActionTypes';

// Recruiter signin
export const recSignin = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: REC_SIGNIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/recruiter/signin`,
      credentials,
      config
    );
    dispatch({
      type: REC_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('recInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REC_SIGNIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Recruiter signout
export const recSignout = () => async (dispatch) => {
  localStorage.removeItem('recInfo');
  dispatch({
    type: REC_SIGNOUT,
  });
};

// Recruiter signup
export const recSignup = (datas) => async (dispatch) => {
  try {
    dispatch({
      type: REC_SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/recruiter/signup`,
      datas,
      config
    );
    dispatch({
      type: REC_SIGNUP_SUCCESS,
    });
    dispatch({
      type: REC_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('devInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REC_SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

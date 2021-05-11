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
  GET_RECRUITER_PROJECTS_REQUEST,
  GET_RECRUITER_PROJECTS_SUCCESS,
  GET_RECRUITER_PROJECTS_FAILED,
  PROJECT_POST_REQUEST,
  PROJECT_POST_SUCCESS,
  PROJECT_POST_FAILED,
  PROJECT_POST_RESET,
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

// Get recruiter projects
export const getRecProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_RECRUITER_PROJECTS_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/project/getRecruiterProjects`,
      config
    );
    dispatch({
      type: GET_RECRUITER_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECRUITER_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Post a project
export const postAProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_POST_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    await axios.post(`${baseURL}/api/project/createProject`, project, config);
    dispatch({
      type: PROJECT_POST_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: PROJECT_POST_RESET,
      });
    }, 3000);
  } catch (error) {
    dispatch({
      type: PROJECT_POST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

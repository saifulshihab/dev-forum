import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  DEV_DP_EDIT_FAIL,
  DEV_DP_EDIT_REQUEST,
  DEV_DP_EDIT_RESET,
  DEV_DP_EDIT_SUCCESS,
  DEV_COVER_EDIT_FAIL,
  DEV_COVER_EDIT_REQUEST,
  DEV_COVER_EDIT_RESET,
  DEV_COVER_EDIT_SUCCESS,
  DEV_PROFILE_DELETE_FAIL,
  DEV_PROFILE_DELETE_REQUEST,
  DEV_PROFILE_DELETE_RESET,
  DEV_PROFILE_DELETE_SUCCESS,
  DEV_PROFILE_EDIT_FAIL,
  DEV_PROFILE_EDIT_REQUEST,
  DEV_PROFILE_EDIT_RESET,
  DEV_PROFILE_EDIT_SUCCESS,
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

// Permanantly delete developer profile
export const deleteDevAccount = (username) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_PROFILE_DELETE_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.delete(`${baseURL}/api/dev/${username}/deleteAccount`, config);
    dispatch({
      type: DEV_PROFILE_DELETE_SUCCESS,
    });
    dispatch({
      type: DEV_PROFILE_DELETE_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_PROFILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Edit developer profile
export const editDevAccount = (username, updateUser) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: DEV_PROFILE_EDIT_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${baseURL}/api/dev/${username}`,
      updateUser.data,
      config
    );
    dispatch({
      type: DEV_PROFILE_EDIT_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DEV_PROFILE_EDIT_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_PROFILE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Edit developer profile picture
export const editDevDp = (dp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_DP_EDIT_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.put(`${baseURL}/api/dev/updateDp`, { dp }, config);
    dispatch({
      type: DEV_DP_EDIT_SUCCESS,
    });
    dispatch({
      type: DEV_DP_EDIT_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_DP_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Edit developer profile cover
export const editDevCover = (cover) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_COVER_EDIT_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.put(`${baseURL}/api/dev/updateCover`, { cover }, config);
    dispatch({
      type: DEV_COVER_EDIT_SUCCESS,
    });
    dispatch({
      type: DEV_COVER_EDIT_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_COVER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

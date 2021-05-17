import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  CIRCULAR_DELETE_FAILED,
  CIRCULAR_DELETE_REQUEST,
  CIRCULAR_DELETE_RESET,
  CIRCULAR_DELETE_SUCCESS,
  CIRCULAR_EDIT_FAILED,
  CIRCULAR_EDIT_REQUEST,
  CIRCULAR_EDIT_RESET,
  CIRCULAR_EDIT_SUCCESS,
  GET_RCIRCULAR_FAILED,
  GET_RCIRCULAR_REQUEST,
  GET_RCIRCULAR_SUCCESS,
  POST_CIRCULAR_FAILED,
  POST_CIRCULAR_REQUEST,
  POST_CIRCULAR_RESET,
  POST_CIRCULAR_SUCCESS,
} from '../ActionTypes';

// Get recruiter ciruclars
export const getRecruiterCirculars = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_RCIRCULAR_REQUEST,
    });

    const {
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/circular/getRecruiterCirculars/${userId}`,
      config
    );
    dispatch({
      type: GET_RCIRCULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RCIRCULAR_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get recruiter ciruclars
export const postCircular = (circular) => async (dispatch, getState) => {
  try {
    dispatch({
      type: POST_CIRCULAR_REQUEST,
    });

    const {
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recInfo.token}`,
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/circular/postCircular`,
      circular,
      config
    );
    dispatch({
      type: POST_CIRCULAR_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: POST_CIRCULAR_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: POST_CIRCULAR_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Delete circular
export const deleteCircular = (circularId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CIRCULAR_DELETE_REQUEST,
    });

    const {
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recInfo.token}`,
      },
    };
    await axios.delete(
      `${baseURL}/api/circular/deleteCircular/${circularId}`,
      config
    );
    dispatch({
      type: CIRCULAR_DELETE_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: CIRCULAR_DELETE_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: CIRCULAR_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Edit circular
export const editCircular =
  (circularId, circular) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CIRCULAR_EDIT_REQUEST,
      });

      const {
        signInRec: { recInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${recInfo.token}`,
          'Content-Type': 'application/json',
        },
      };
      await axios.put(
        `${baseURL}/api/circular/editCircular/${circularId}`,
        circular,
        config
      );
      dispatch({
        type: CIRCULAR_EDIT_SUCCESS,
      });
      setTimeout(() => {
        dispatch({
          type: CIRCULAR_EDIT_RESET,
        });
      }, 1000);
    } catch (error) {
      dispatch({
        type: CIRCULAR_EDIT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

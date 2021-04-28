import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  CREATE_QUESTION_FAILED,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_RESET,
  CREATE_QUESTION_SUCCESS,
  GET_ALL_QUESTIONS_FAILED,
  GET_ALL_QUESTIONS_REQUEST,
  GET_ALL_QUESTIONS_SUCCESS,
  QUESTION_DELETE_FAILED,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_RESET,
  QUESTION_DELETE_SUCCESS,
  QUESTION_EDIT_FAILED,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_RESET,
  QUESTION_EDIT_SUCCESS,
} from '../ActionTypes';

// get all questions
export const getQuestions = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_ALL_QUESTIONS_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/question/getAllQuestions`,
      config
    );
    dispatch({
      type: GET_ALL_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_ALL_QUESTIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create question
export const createQuestion = (question) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_QUESTION_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/question/createQuestion`,
      question,
      config
    );
    dispatch({
      type: CREATE_QUESTION_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: CREATE_QUESTION_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: CREATE_QUESTION_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete question
export const deleteQuestion = (questionId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: QUESTION_DELETE_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.delete(
      `${baseURL}/api/question/deleteQuestion/${questionId}`,
      config
    );
    dispatch({
      type: QUESTION_DELETE_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: QUESTION_DELETE_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: QUESTION_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit question
export const editQuestion = (questionId, updateQuestion) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: QUESTION_EDIT_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.put(
      `${baseURL}/api/question/editQuestion/${questionId}`,
      updateQuestion,
      config
    );
    dispatch({
      type: QUESTION_EDIT_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: QUESTION_EDIT_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: QUESTION_EDIT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

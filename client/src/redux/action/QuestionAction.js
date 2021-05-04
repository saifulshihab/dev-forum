import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  ADD_ANSWER,
  CREATE_QUESTION_FAILED,
  CREATE_QUESTION_REQUEST,
  CREATE_QUESTION_RESET,
  CREATE_QUESTION_SUCCESS,
  GET_ALL_QUESTIONS_FAILED,
  GET_ALL_QUESTIONS_REQUEST,
  GET_ALL_QUESTIONS_SUCCESS,
  GET_Q_ANSWERS_FAILED,
  GET_Q_ANSWERS_REQUEST,
  GET_Q_ANSWERS_SUCCESS,
  QUESTION_DELETE_FAILED,
  QUESTION_DELETE_REQUEST,
  QUESTION_DELETE_RESET,
  QUESTION_DELETE_SUCCESS,
  QUESTION_EDIT_FAILED,
  QUESTION_EDIT_REQUEST,
  QUESTION_EDIT_RESET,
  QUESTION_EDIT_SUCCESS,
  ADD_ANSWER_FAILED,
  UPVOTE_ANSWER_FAIL,
  UPVOTE_ANSWER_SUCCESS,
  DOWNVOTE_ANSWER_SUCCESS,
  DOWNVOTE_ANSWER_FAIL,
  GET_USER_QUESTIONS_REQUEST,
  GET_USER_QUESTIONS_SUCCESS,
  GET_USER_QUESTIONS_FAILED,
  DELETE_ANS_FAILED,
  DELETE_ANS_SUCCESS,
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
// get question answers
export const getQuestionAnswers = (questionId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: GET_Q_ANSWERS_REQUEST,
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
      `${baseURL}/api/question/getAnswers/${questionId}`,
      config
    );
    dispatch({
      type: GET_Q_ANSWERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_Q_ANSWERS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// add new answer
export const addAnswer = (questionId, answer) => async (dispatch, getState) => {
  try {
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/question/${questionId}/createAnswer`,
      { answer },
      config
    );
    dispatch({
      type: ADD_ANSWER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_ANSWER_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// upvote article
export const upvoteAnswer = (answerId) => async (dispatch, getState) => {
  try {
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${baseURL}/api/question/upvoteAnswer/${answerId}`,
      {},
      config
    );
    dispatch({
      type: UPVOTE_ANSWER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: UPVOTE_ANSWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// upvote article
export const downvoteAnswer = (answerId) => async (dispatch, getState) => {
  try {
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `${baseURL}/api/question/downvoteAnswer/${answerId}`,
      {},
      config
    );
    dispatch({
      type: DOWNVOTE_ANSWER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DOWNVOTE_ANSWER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user questions
export const getUserQuestions = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_USER_QUESTIONS_REQUEST,
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
      `${baseURL}/api/question/getUserQuestions/${userId}`,
      config
    );

    dispatch({
      type: GET_USER_QUESTIONS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_USER_QUESTIONS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// get user questions
export const deleteAnswer = (answerId) => async (dispatch, getState) => {
  try {
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${baseURL}/api/question/deleteAnswer/${answerId}`,
      config
    );

    dispatch({
      type: DELETE_ANS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_ANS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

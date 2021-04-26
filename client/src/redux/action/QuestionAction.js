import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  GET_ALL_QUESTIONS_FAILED,
  GET_ALL_QUESTIONS_REQUEST,
  GET_ALL_QUESTIONS_SUCCESS,
} from '../ActionTypes';

// delete Shared article
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

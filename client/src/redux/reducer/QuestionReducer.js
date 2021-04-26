import {
  GET_ALL_QUESTIONS_FAILED,
  GET_ALL_QUESTIONS_REQUEST,
  GET_ALL_QUESTIONS_SUCCESS,
} from '../ActionTypes';

export const getQuestionReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_ALL_QUESTIONS_SUCCESS:
      return { loading: false, questions: action.payload };
    case GET_ALL_QUESTIONS_FAILED:
      return { loading: false, articles: action.payload };
    default:
      return state;
  }
};

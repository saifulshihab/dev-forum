import {
  ADD_ANSWER,
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
} from '../ActionTypes';

export const getQuestionReducer = (state = { questions: [] }, action) => {
  switch (action.type) {
    case GET_ALL_QUESTIONS_REQUEST:
      return { loading: true };
    case GET_ALL_QUESTIONS_SUCCESS:
      return { ...state, loading: false, questions: action.payload };
    case CREATE_QUESTION_SUCCESS:
      return {
        ...state,
        loading: false,
        createQuestion: true,
        questions: [action.payload, ...state.questions],
      };
    case CREATE_QUESTION_RESET:
      return { ...state, createQuestion: false };
    case GET_ALL_QUESTIONS_FAILED:
      return { loading: false, articles: action.payload };
    default:
      return state;
  }
};

export const deleteQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_DELETE_REQUEST:
      return { loading: true };
    case QUESTION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case QUESTION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const editQuestionReducer = (state = {}, action) => {
  switch (action.type) {
    case QUESTION_EDIT_REQUEST:
      return { loading: true };
    case QUESTION_EDIT_SUCCESS:
      return { loading: false, success: true };
    case QUESTION_EDIT_FAILED:
      return { loading: false, error: action.payload };
    case QUESTION_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const questionAnswersReducer = (state = { answers: [] }, action) => {
  switch (action.type) {
    case GET_Q_ANSWERS_REQUEST:
      return { loading: true };
    case GET_Q_ANSWERS_SUCCESS:
      return { loading: false, answers: action.payload };
    case ADD_ANSWER:
      return { loading: false, answers: [action.payload, ...state.answers] };
    case ADD_ANSWER_FAILED:
      return { loading: false, error: action.payload };
    case GET_Q_ANSWERS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

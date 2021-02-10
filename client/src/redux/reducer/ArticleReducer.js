import {
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_RESET,
  CREATE_ARTICLE_SUCCESS,
  FETCH_ALL_ARTICLE_FAIL,
  FETCH_ALL_ARTICLE_REQUEST,
  FETCH_ALL_ARTICLE_SUCCESS,
  FETCH_SINGLE_ARTICLE_FAIL,
  FETCH_SINGLE_ARTICLE_REQUEST,
  FETCH_SINGLE_ARTICLE_SUCCESS,
} from '../ActionTypes';

export const fetchAllArticelReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLE_REQUEST:
      return { loading: true };
    case FETCH_ALL_ARTICLE_SUCCESS:
      return { loading: false, articles: action.payload };
    case FETCH_ALL_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const createArticelReducer = (state = {}, action) => {
  switch (action.type) {
    case CREATE_ARTICLE_REQUEST:
      return { loading: true };
    case CREATE_ARTICLE_SUCCESS:
      return { loading: false, success: true };
    case CREATE_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    case CREATE_ARTICLE_RESET:
      return {};
    default:
      return state;
  }
};

export const fetchSingleArticelReducer = (state = { article: {} }, action) => {
  switch (action.type) {
    case FETCH_SINGLE_ARTICLE_REQUEST:
      return { loading: true };
    case FETCH_SINGLE_ARTICLE_SUCCESS:
      return { loading: false, article: action.payload };
    case FETCH_SINGLE_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

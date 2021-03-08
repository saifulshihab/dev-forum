import {
  ADD_COMMENT,
  ARTICLE_EDIT_FAIL,
  ARTICLE_EDIT_REQUEST,
  ARTICLE_EDIT_RESET,
  ARTICLE_EDIT_SUCCESS,
  CREATE_ARTICLE_FAIL,
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_RESET,
  CREATE_ARTICLE_SUCCESS,
  DELETE_SINGLE_ARTICLE_FAIL,
  DELETE_SINGLE_ARTICLE_REQUEST,
  DELETE_SINGLE_ARTICLE_RESET,
  DELETE_SINGLE_ARTICLE_SUCCESS,
  DOWNVOTE_FAIL,
  DOWNVOTE_SUCCESS,
  FETCH_ALL_ARTICLE_FAIL,
  FETCH_ALL_ARTICLE_REQUEST,
  FETCH_ALL_ARTICLE_SUCCESS,
  FETCH_COMMENT_FAIL,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_SINGLE_ARTICLE_FAIL,
  FETCH_SINGLE_ARTICLE_REQUEST,
  FETCH_SINGLE_ARTICLE_SUCCESS,
  FETCH_USER_ARTICLES_FAIL,
  FETCH_USER_ARTICLES_REQUEST,
  FETCH_USER_ARTICLES_SUCCESS,
  UPVOTE_FAIL,
  UPVOTE_SUCCESS,
  UPVOTE_fDETAILS_SUCCESS,
  DOWNVOTE_fDETAILS_SUCCESS,
} from '../ActionTypes';

export const fetchAllArticelReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case FETCH_ALL_ARTICLE_REQUEST:
      return { loading: true };
    case FETCH_ALL_ARTICLE_SUCCESS:
      return { loading: false, articles: action.payload };
    case FETCH_ALL_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    case UPVOTE_SUCCESS:
      return { loading: false, articles: action.payload };
    case DOWNVOTE_SUCCESS:
      return { loading: false, articles: action.payload };
    case UPVOTE_FAIL:
      return { loading: false, error: action.payload };
    case DOWNVOTE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SINGLE_ARTICLE_SUCCESS:
      return { loading: false, articles: action.payload };
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
    case UPVOTE_fDETAILS_SUCCESS:
      return { loading: false, article: action.payload };
    case DOWNVOTE_fDETAILS_SUCCESS:
      return { loading: false, article: action.payload };
    case UPVOTE_FAIL:
      return { loading: false, error: action.payload };
    case DOWNVOTE_FAIL:
      return { loading: false, error: action.payload };
    case FETCH_SINGLE_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const fetchUserArticlesReducer = (state = { articles: [] }, action) => {
  switch (action.type) {
    case FETCH_USER_ARTICLES_REQUEST:
      return { loading: true };
    case FETCH_USER_ARTICLES_SUCCESS:
      return { loading: false, articles: action.payload };
    case FETCH_USER_ARTICLES_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const delSingleArticelReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_SINGLE_ARTICLE_REQUEST:
      return { loading: true };
    case DELETE_SINGLE_ARTICLE_SUCCESS:
      return { loading: false, success: true };
    case DELETE_SINGLE_ARTICLE_FAIL:
      return { loading: false, error: action.payload };
    case DELETE_SINGLE_ARTICLE_RESET:
      return {};
    default:
      return state;
  }
};

export const editArticelReducer = (state = {}, action) => {
  switch (action.type) {
    case ARTICLE_EDIT_REQUEST:
      return { loading: true };
    case ARTICLE_EDIT_SUCCESS:
      return { loading: false, success: true };
    case ARTICLE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case ARTICLE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const articleCommentsReducer = (state = { comments: [] }, action) => {
  switch (action.type) {
    case FETCH_COMMENT_REQUEST:
      return { loading: true };
    case FETCH_COMMENT_SUCCESS:
      return { loading: false, comments: action.payload };
    case FETCH_COMMENT_FAIL:
      return { loading: false, error: action.payload };
    case ADD_COMMENT:
      return { loading: false, comments: action.payload };
    default:
      return state;
  }
};

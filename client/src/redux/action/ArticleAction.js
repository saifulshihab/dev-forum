import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  CREATE_ARTICLE_REQUEST,
  CREATE_ARTICLE_SUCCESS,
  CREATE_ARTICLE_FAIL,
  FETCH_ALL_ARTICLE_REQUEST,
  FETCH_ALL_ARTICLE_SUCCESS,
  FETCH_ALL_ARTICLE_FAIL,
  FETCH_SINGLE_ARTICLE_REQUEST,
  FETCH_SINGLE_ARTICLE_SUCCESS,
  FETCH_SINGLE_ARTICLE_FAIL,
  FETCH_USER_ARTICLES_REQUEST,
  FETCH_USER_ARTICLES_SUCCESS,
  FETCH_USER_ARTICLES_FAIL,
  DELETE_SINGLE_ARTICLE_REQUEST,
  DELETE_SINGLE_ARTICLE_SUCCESS,
  DELETE_SINGLE_ARTICLE_FAIL,
  ARTICLE_EDIT_REQUEST,
  ARTICLE_EDIT_SUCCESS,
  ARTICLE_EDIT_FAIL,
  ARTICLE_EDIT_RESET,
  UPVOTE_SUCCESS,
  UPVOTE_FAIL,
  UPVOTE_RESET,
  DOWNVOTE_SUCCESS,
  DOWNVOTE_RESET,
  DOWNVOTE_FAIL,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAIL,
  ADD_COMMENT,
  //   CREATE_ARTICLE_RESET,
} from '../ActionTypes';

// fetch all articles
export const getAllArticles = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_ALL_ARTICLE_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseURL}/api/article`, config);
    dispatch({
      type: FETCH_ALL_ARTICLE_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: CREATE_ARTICLE_RESET,
    // });
  } catch (error) {
    dispatch({
      type: FETCH_ALL_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// create article
export const articleCreate = (article) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CREATE_ARTICLE_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.post(`${baseURL}/api/article`, article, config);
    dispatch({
      type: CREATE_ARTICLE_SUCCESS,
    });
    // dispatch({
    //   type: CREATE_ARTICLE_RESET,
    // });
  } catch (error) {
    dispatch({
      type: CREATE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// fetch user articles
export const getUserArticles = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_USER_ARTICLES_REQUEST,
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
      `${baseURL}/api/article/${userId}/articles`,
      config
    );
    dispatch({
      type: FETCH_USER_ARTICLES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_ARTICLES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// create article
export const getSingleArticle = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FETCH_SINGLE_ARTICLE_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseURL}/api/article/${id}`, config);
    dispatch({
      type: FETCH_SINGLE_ARTICLE_SUCCESS,
      payload: data,
    });
    // dispatch({
    //   type: CREATE_ARTICLE_RESET,
    // });
  } catch (error) {
    dispatch({
      type: FETCH_SINGLE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// delete article
export const deleteArticle = (articleId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DELETE_SINGLE_ARTICLE_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.delete(
      `${baseURL}/api/article/${articleId}`,
      config
    );
    dispatch({
      type: DELETE_SINGLE_ARTICLE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_SINGLE_ARTICLE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// edit article
export const articleEdit = (articleId, updatedArticle) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ARTICLE_EDIT_REQUEST,
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
      `${baseURL}/api/article/${articleId}`,
      updatedArticle,
      config
    );
    dispatch({
      type: ARTICLE_EDIT_SUCCESS,
    });

    setTimeout(() => {
      dispatch({
        type: ARTICLE_EDIT_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: ARTICLE_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// upvote article
export const upvoteArticle = (articleId) => async (dispatch, getState) => {
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
      `${baseURL}/api/article/${articleId}/upvote`,
      {},
      config
    );
    dispatch({
      type: UPVOTE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: UPVOTE_RESET,
    });
  } catch (error) {
    dispatch({
      type: UPVOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// upvote article
export const downvoteArticle = (articleId) => async (dispatch, getState) => {
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
      `${baseURL}/api/article/${articleId}/downvote`,
      {},
      config
    );
    dispatch({
      type: DOWNVOTE_SUCCESS,
      payload: data,
    });
    dispatch({
      type: DOWNVOTE_RESET,
    });
  } catch (error) {
    dispatch({
      type: DOWNVOTE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// fetch article comments
export const fetchCommentArticle = (articleId) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: FETCH_COMMENT_REQUEST,
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
      `${baseURL}/api/article/${articleId}/comment`,
      config
    );
    dispatch({
      type: FETCH_COMMENT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// fetch article comments
export const commentOnArticle = (articleId, comment) => async (
  dispatch,
  getState
) => {
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
      `${baseURL}/api/article/${articleId}/comment`,
      { comment },
      config
    );
    dispatch({
      type: ADD_COMMENT,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: FETCH_COMMENT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

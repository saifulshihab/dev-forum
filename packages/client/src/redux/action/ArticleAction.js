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
  DOWNVOTE_SUCCESS,
  DOWNVOTE_FAIL,
  FETCH_COMMENT_REQUEST,
  FETCH_COMMENT_SUCCESS,
  FETCH_COMMENT_FAIL,
  ADD_COMMENT,
  UPVOTE_fDETAILS_SUCCESS,
  DOWNVOTE_fDETAILS_SUCCESS,
  DOWNVOTE_fUSERPROFILE_SUCCESS,
  UPVOTE_fUSERPROFILE_SUCCESS,
  SHARE_ARTICLE_REQUEST,
  SHARE_ARTICLE_SUCCESS,
  SHARE_ARTICLE_FAILED,
  GET_SHARED_ARTICLE_REQUEST,
  GET_SHARED_ARTICLE_SUCCESS,
  GET_SHARED_ARTICLE_FAILED,
  DELETE_SHARED_ARTICLE_REQUEST,
  DELETE_SHARED_ARTICLE_FALIED,
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
export const getUserArticles =
  (userId, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: FETCH_USER_ARTICLES_REQUEST,
      });

      const {
        signInDev: { devInfo },
        signInRec: { recInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${
            recruiterView ? recInfo.token : devInfo.token
          }`,
        },
      };
      const { data } = await axios.get(
        recruiterView
          ? `${baseURL}/api/article/${userId}/articles/recruiterView`
          : `${baseURL}/api/article/${userId}/articles`,
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
export const articleEdit =
  (articleId, updatedArticle) => async (dispatch, getState) => {
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
export const upvoteArticle =
  (articleId, singleArticle, fromUserProfile) => async (dispatch, getState) => {
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
        `${baseURL}/api/article/${articleId}/upvote?singleArticle=${
          singleArticle ? 'true' : 'false'
        }`,
        {},
        config
      );
      if (singleArticle) {
        dispatch({
          type: UPVOTE_fDETAILS_SUCCESS,
          payload: data,
        });
      } else if (!singleArticle && fromUserProfile) {
        dispatch({
          type: UPVOTE_fUSERPROFILE_SUCCESS,
          payload: data,
        });
      } else if (!singleArticle) {
        dispatch({
          type: UPVOTE_SUCCESS,
          payload: data,
        });
      }
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
export const downvoteArticle =
  (articleId, singleArticle, fromUserProfile) => async (dispatch, getState) => {
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
        `${baseURL}/api/article/${articleId}/downvote?singleArticle=${
          singleArticle ? 'true' : 'false'
        }`,
        {},
        config
      );
      if (singleArticle) {
        dispatch({
          type: DOWNVOTE_fDETAILS_SUCCESS,
          payload: data,
        });
      } else if (!singleArticle && fromUserProfile) {
        dispatch({
          type: DOWNVOTE_fUSERPROFILE_SUCCESS,
          payload: data,
        });
      } else if (!singleArticle) {
        dispatch({
          type: DOWNVOTE_SUCCESS,
          payload: data,
        });
      }
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
export const fetchCommentArticle =
  (articleId) => async (dispatch, getState) => {
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
export const commentOnArticle =
  (articleId, comment) => async (dispatch, getState) => {
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
// share an article
export const shareArticle =
  (articleId, caption) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SHARE_ARTICLE_REQUEST,
      });
      const {
        signInDev: { devInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${devInfo.token}`,
        },
      };
      await axios.post(
        `${baseURL}/api/article/${articleId}/share`,
        { caption },
        config
      );
      dispatch({
        type: SHARE_ARTICLE_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: SHARE_ARTICLE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// get Shared articles
export const getSharedArticle =
  (userId, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_SHARED_ARTICLE_REQUEST,
      });
      const {
        signInDev: { devInfo },
        signInRec: { recInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${
            recruiterView ? recInfo.token : devInfo.token
          }`,
        },
      };
      const { data } = await axios.get(
        `${
          recruiterView
            ? `${baseURL}/api/article/getSharedArticle/${userId}/recruiterView`
            : `${baseURL}/api/article/getSharedArticle/${userId}`
        }`,
        config
      );
      dispatch({
        type: GET_SHARED_ARTICLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_SHARED_ARTICLE_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// delete Shared article
export const deleteSharedArticle =
  (sharedArticleId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DELETE_SHARED_ARTICLE_REQUEST,
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
        `${baseURL}/api/article/deleteSharedArticle/${sharedArticleId}`,
        config
      );
      dispatch({
        type: DELETE_SINGLE_ARTICLE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DELETE_SHARED_ARTICLE_FALIED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

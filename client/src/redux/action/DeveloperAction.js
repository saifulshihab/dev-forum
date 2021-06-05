import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  DEV_DP_EDIT_FAIL,
  DEV_DP_EDIT_REQUEST,
  DEV_DP_EDIT_RESET,
  DEV_DP_EDIT_SUCCESS,
  DEV_COVER_EDIT_FAIL,
  DEV_COVER_EDIT_REQUEST,
  DEV_COVER_EDIT_RESET,
  DEV_COVER_EDIT_SUCCESS,
  DEV_PROFILE_DELETE_FAIL,
  DEV_PROFILE_DELETE_REQUEST,
  DEV_PROFILE_DELETE_RESET,
  DEV_PROFILE_DELETE_SUCCESS,
  DEV_PROFILE_EDIT_FAIL,
  DEV_PROFILE_EDIT_REQUEST,
  DEV_PROFILE_EDIT_RESET,
  DEV_PROFILE_EDIT_SUCCESS,
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNOUT,
  DEV_SIGNUP_FAIL,
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
  GET_DEV_PROFILE_FAIL,
  GET_DEV_PROFILE_REQUEST,
  GET_DEV_PROFILE_SUCCESS,
  DEV_PUBLIC_VIEW_REQUEST,
  DEV_PUBLIC_VIEW_SUCCESS,
  DEV_PUBLIC_VIEW_FAIL,
  GET_USER_PROJECT_REQUEST,
  GET_USER_PROJECT_SUCCESS,
  GET_USER_PROJECT_FAILED,
  ADD_USER_PROJECT_REQUEST,
  ADD_USER_PROJECT_SUCCESS,
  ADD_USER_PROJECT_FAILED,
  DELETE_USER_PROJECT_SUCCESS,
  DELETE_USER_PROJECT_FAILED,
  EDIT_USER_PROJECT_SUCCESS,
  EDIT_USER_PROJECT_FAILED,
  GET_DEVELOPERS_REQUEST,
  GET_DEVELOPERS_SUCCESS,
  GET_DEVELOPERS_FAILED,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILED,
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAILED,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILED,
  FOLLOW_RESET,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_RESET,
  UNFOLLOW_FAILED,
  GET_CIRCULAR_REQUEST,
  GET_CIRCULAR_SUCCESS,
  GET_CIRCULAR_FAILED,
  CHANGE_WORK_STATUS_REQUEST,
  CHANGE_WORK_STATUS_SUCCESS,
  CHANGE_WORK_STATUS_FAILED,
  CHANGE_WORK_STATUS_RESET,
  DEV_RESET_PASSWORD_REQUEST,
  DEV_RESET_PASSWORD_SUCCESS,
  DEV_RESET_PASSWORD_FAILED,
  DEV_RESET_PASSWORD_RESET,
  DEV_RESET_PASSWORD_FROM_LINK_REQUEST,
  DEV_RESET_PASSWORD_FROM_LINK_SUCCESS,
  DEV_RESET_PASSWORD_FROM_LINK_FAILED,
  GET_PASSWORD_RESET_LINK_DEV_REQUEST,
  GET_PASSWORD_RESET_LINK_DEV_SUCCESS,
  GET_PASSWORD_RESET_LINK_DEV_FAILED,
  GET_PASSWORD_RESET_LINK_DEV_RESET,
  DEV_SIGNUP_RESET,
  DEV_GET_CHAT_ROOMS_REQUEST,
  DEV_GET_CHAT_ROOMS_SUCCESS,
  DEV_GET_CHAT_ROOMS_FAILED,
  DEV_CREATE_CHAT_ROOM_REQUEST,
  DEV_CREATE_CHAT_ROOM_SUCCESS,
  DEV_CREATE_CHAT_ROOM_FAILED,
  DEV_CREATE_CHAT_ROOM_RESET,
  CHAT_DELETE_REQUEST,
  CHAT_DELETE_SUCCESS,
  CHAT_DELETE_RESET,
  CHAT_DELETE_FAILED,
} from '../ActionTypes';

// Developer signup
export const devSignup = (dev) => async (dispatch) => {
  try {
    dispatch({
      type: DEV_SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/dev/signup`,
      { dev },
      config
    );
    dispatch({
      type: DEV_SIGNUP_SUCCESS,
    });
    dispatch({
      type: DEV_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('devInfo', JSON.stringify(data));

    setTimeout(() => {
      dispatch({
        type: DEV_SIGNUP_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: DEV_SIGNUP_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Developer signin
export const devSignin = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: DEV_SIGNIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/dev/signin`,
      { credentials },
      config
    );
    dispatch({
      type: DEV_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('devInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: DEV_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Developer signout
export const devSignout = () => async (dispatch) => {
  localStorage.removeItem('devInfo');
  dispatch({ type: DEV_SIGNOUT });
};

// Fetch developer profile
export const fetchDevProfile = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DEV_PROFILE_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    const { data } = await axios.get(`${baseURL}/api/dev/${id}`, config);
    dispatch({
      type: GET_DEV_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEV_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Permanantly delete developer profile
export const deleteDevAccount = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_PROFILE_DELETE_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.delete(`${baseURL}/api/dev/${id}/deleteAccount`, config);
    dispatch({
      type: DEV_PROFILE_DELETE_SUCCESS,
    });
    dispatch({
      type: DEV_PROFILE_DELETE_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_PROFILE_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Edit developer profile
export const editDevAccount =
  (id, updateUser) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DEV_PROFILE_EDIT_REQUEST,
      });
      const {
        signInDev: { devInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${devInfo.token}`,
        },
      };
      const { data } = await axios.put(
        `${baseURL}/api/dev/${id}`,
        updateUser.data,
        config
      );
      dispatch({
        type: DEV_PROFILE_EDIT_SUCCESS,
        payload: data,
      });
      dispatch({
        type: DEV_PROFILE_EDIT_RESET,
      });
    } catch (error) {
      dispatch({
        type: DEV_PROFILE_EDIT_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Edit developer profile picture
export const editDevDp = (dp) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_DP_EDIT_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.put(`${baseURL}/api/dev/updateDp`, { dp }, config);
    dispatch({
      type: DEV_DP_EDIT_SUCCESS,
    });
    dispatch({
      type: DEV_DP_EDIT_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_DP_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Edit developer profile cover
export const editDevCover = (cover) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_COVER_EDIT_REQUEST,
    });

    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.put(`${baseURL}/api/dev/updateCover`, { cover }, config);
    dispatch({
      type: DEV_COVER_EDIT_SUCCESS,
    });
    dispatch({
      type: DEV_COVER_EDIT_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_COVER_EDIT_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Developer profile publiv view
export const getDevPublicProfile =
  (username, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DEV_PUBLIC_VIEW_REQUEST,
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
            ? `${baseURL}/api/dev/user/${username}/recruiterView`
            : `${baseURL}/api/dev/user/${username}`
        }`,
        config
      );
      dispatch({
        type: DEV_PUBLIC_VIEW_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEV_PUBLIC_VIEW_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Get developer projects
export const getUserProjects =
  (userId, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: GET_USER_PROJECT_REQUEST,
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
            ? `${baseURL}/api/dev/getProjects/${userId}/recruiterView`
            : `${baseURL}/api/dev/getProjects/${userId}`
        }`,
        config
      );
      dispatch({
        type: GET_USER_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: GET_USER_PROJECT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Add project
export const addProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_USER_PROJECT_REQUEST,
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
      `${baseURL}/api/dev/addProject`,
      project,
      config
    );
    dispatch({
      type: ADD_USER_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADD_USER_PROJECT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Delete project
export const deleteProject = (projectId) => async (dispatch, getState) => {
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
      `${baseURL}/api/dev/deleteProject/${projectId}`,
      config
    );
    dispatch({
      type: DELETE_USER_PROJECT_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: DELETE_USER_PROJECT_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Delete project
export const editProject =
  (projectId, project) => async (dispatch, getState) => {
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
        `${baseURL}/api/dev/editProject/${projectId}`,
        project,
        config
      );
      dispatch({
        type: EDIT_USER_PROJECT_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: EDIT_USER_PROJECT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Delete project
export const getDevelopers = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_DEVELOPERS_REQUEST,
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
      `${baseURL}/api/dev/developers/list`,
      config
    );
    dispatch({
      type: GET_DEVELOPERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_DEVELOPERS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get following  users
export const getFollowing = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FOLLOWING_REQUEST,
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
      `${baseURL}/api/dev/following/${userId}`,
      config
    );
    dispatch({
      type: GET_FOLLOWING_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWING_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get followers of specific user
export const getFollowers = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FOLLOWERS_REQUEST,
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
      `${baseURL}/api/dev/followers/${userId}`,
      config
    );
    dispatch({
      type: GET_FOLLOWERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FOLLOWERS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Follow other
export const followOther = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: FOLLOW_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.post(`${baseURL}/api/dev/follow/${userId}`, {}, config);
    dispatch({
      type: FOLLOW_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: FOLLOW_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: FOLLOW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// UNfollow other
export const unfollowOther = (userId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: UNFOLLOW_REQUEST,
    });
    const {
      signInDev: { devInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${devInfo.token}`,
      },
    };
    await axios.delete(`${baseURL}/api/dev/unfollow/${userId}`, config);
    dispatch({
      type: UNFOLLOW_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: UNFOLLOW_RESET,
      });
    }, 1000);
  } catch (error) {
    dispatch({
      type: UNFOLLOW_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get circulars
export const getJobCirculars = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_CIRCULAR_REQUEST,
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
      `${baseURL}/api/dev/getJobCirculars/list`,
      config
    );
    dispatch({
      type: GET_CIRCULAR_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_CIRCULAR_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Change work status
export const changeWorkStatus =
  (userId, status) => async (dispatch, getState) => {
    try {
      dispatch({
        type: CHANGE_WORK_STATUS_REQUEST,
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
        `${baseURL}/api/dev/changeWorkStatus/${userId}`,
        status,
        config
      );
      dispatch({
        type: CHANGE_WORK_STATUS_SUCCESS,
      });
      dispatch({
        type: CHANGE_WORK_STATUS_RESET,
      });
    } catch (error) {
      dispatch({
        type: CHANGE_WORK_STATUS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Reset password
export const devResetPassword = (newPassword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: DEV_RESET_PASSWORD_REQUEST,
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
      `${baseURL}/api/dev/resetPasswordDev/${devInfo?._id}`,
      newPassword,
      config
    );
    dispatch({
      type: DEV_RESET_PASSWORD_SUCCESS,
    });
    dispatch({
      type: DEV_RESET_PASSWORD_RESET,
    });
  } catch (error) {
    dispatch({
      type: DEV_RESET_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Get reset password link
export const getResetPasswordLinkDev = (email) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PASSWORD_RESET_LINK_DEV_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/dev/getResetPasswordLinkDev`,
      { email },
      config
    );
    dispatch({
      type: GET_PASSWORD_RESET_LINK_DEV_SUCCESS,
      payload: data.message,
    });
    setTimeout(() => {
      dispatch({
        type: GET_PASSWORD_RESET_LINK_DEV_RESET,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: GET_PASSWORD_RESET_LINK_DEV_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Reset password from link
export const resetPasswordFromLink =
  (token, newPass, conPass) => async (dispatch) => {
    try {
      dispatch({
        type: DEV_RESET_PASSWORD_FROM_LINK_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `${baseURL}/api/dev/resetPasswordFromLink/${token}`,
        { newPass, conPass },
        config
      );
      dispatch({
        type: DEV_RESET_PASSWORD_FROM_LINK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: DEV_RESET_PASSWORD_FROM_LINK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Get chat rooms
export const devGetChatRooms =
  (userId, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DEV_GET_CHAT_ROOMS_REQUEST,
      });
      const {
        signInDev: { devInfo },
        signInRec: { recInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${
            recruiterView ? recInfo.token : devInfo.token
          } `,
        },
      };
      const { data } = await axios.get(
        recruiterView
          ? `${baseURL}/api/chat/getChatRooms/${userId}?recruiter=true`
          : `${baseURL}/api/chat/getChatRooms/${userId}`,
        config
      );
      dispatch({
        type: DEV_GET_CHAT_ROOMS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: DEV_GET_CHAT_ROOMS_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Create chat rooms
export const devCreateChatRoom =
  (roomInfo, recruiterView) => async (dispatch, getState) => {
    try {
      dispatch({
        type: DEV_CREATE_CHAT_ROOM_REQUEST,
      });
      const {
        signInDev: { devInfo },
        signInRec: { recInfo },
      } = getState();

      const config = {
        headers: {
          Authorization: `Bearer ${
            recruiterView ? recInfo.token : devInfo.token
          } `,
        },
      };
      await axios.post(
        recruiterView
          ? `${baseURL}/api/chat/createRoomByRecruiter`
          : `${baseURL}/api/chat/createNewRoom    `,
        roomInfo,
        config
      );
      dispatch({
        type: DEV_CREATE_CHAT_ROOM_SUCCESS,
      });
      setTimeout(() => {
        dispatch({
          type: DEV_CREATE_CHAT_ROOM_RESET,
        });
      }, 3000);
    } catch (error) {
      dispatch({
        type: DEV_CREATE_CHAT_ROOM_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: DEV_CREATE_CHAT_ROOM_RESET,
        });
      }, 2000);
    }
  };
// Delete a Chat
export const deleteChat = (roomId, recruiter) => async (dispatch, getState) => {
  try {
    dispatch({
      type: CHAT_DELETE_REQUEST,
    });
    const {
      signInDev: { devInfo },
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recruiter ? recInfo.token : devInfo.token} `,
      },
    };
    await axios.delete(
      recruiter
        ? `${baseURL}/api/chat/deleteChatByRecruiter/${roomId}`
        : `${baseURL}/api/chat/deleteChat/${roomId}`,
      config
    );
    dispatch({
      type: CHAT_DELETE_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: CHAT_DELETE_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: CHAT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: CHAT_DELETE_RESET,
      });
    }, 2000);
  }
};

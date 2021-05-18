import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  REC_SIGNIN_REQUEST,
  REC_SIGNIN_SUCCESS,
  REC_SIGNIN_FAILED,
  REC_SIGNOUT,
  REC_SIGNUP_REQUEST,
  REC_SIGNUP_SUCCESS,
  REC_SIGNUP_FAILED,
  GET_RECRUITER_PROJECTS_REQUEST,
  GET_RECRUITER_PROJECTS_SUCCESS,
  GET_RECRUITER_PROJECTS_FAILED,
  PROJECT_POST_REQUEST,
  PROJECT_POST_SUCCESS,
  PROJECT_POST_FAILED,
  PROJECT_POST_RESET,
  PROJECT_EDIT_REQUEST,
  PROJECT_EDIT_SUCCESS,
  PROJECT_EDIT_FAILED,
  PROJECT_DELETE_SUCCESS,
  PROJECT_DELETE_FAILED,
  PROJECT_DELETE_RESET,
  GET_RECRUITER_PROFILE_REQUEST,
  GET_RECRUITER_PROFILE_SUCCESS,
  GET_RECRUITER_PROFILE_FAILED,
  EDIT_RECRUITER_PROFILE_REQUEST,
  EDIT_RECRUITER_PROFILE_SUCCESS,
  EDIT_RECRUITER_PROFILE_FAILED,
  EDIT_RECRUITER_PROFILE_RESET,
  GET_PASSWORD_RESET_LINK_REC_REQUEST,
  GET_PASSWORD_RESET_LINK_REC_SUCCESS,
  GET_PASSWORD_RESET_LINK_REC_RESET,
  GET_PASSWORD_RESET_LINK_DEV_FAILED,
  REC_RESET_PASSWORD_FROM_LINK_REQUEST,
  REC_RESET_PASSWORD_FROM_LINK_SUCCESS,
  REC_RESET_PASSWORD_FROM_LINK_FAILED,
  REC_RESET_PASSWORD_REQUEST,
  REC_RESET_PASSWORD_SUCCESS,
  REC_RESET_PASSWORD_FAILED,
  REC_RESET_PASSWORD_RESET,
} from '../ActionTypes';

// Recruiter signin
export const recSignin = (credentials) => async (dispatch) => {
  try {
    dispatch({
      type: REC_SIGNIN_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/recruiter/signin`,
      credentials,
      config
    );
    dispatch({
      type: REC_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('recInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REC_SIGNIN_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Recruiter signout
export const recSignout = () => async (dispatch) => {
  localStorage.removeItem('recInfo');
  dispatch({
    type: REC_SIGNOUT,
  });
};

// Recruiter signup
export const recSignup = (datas) => async (dispatch) => {
  try {
    dispatch({
      type: REC_SIGNUP_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/recruiter/signup`,
      datas,
      config
    );
    dispatch({
      type: REC_SIGNUP_SUCCESS,
    });
    dispatch({
      type: REC_SIGNIN_SUCCESS,
      payload: data,
    });
    localStorage.setItem('devInfo', JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: REC_SIGNUP_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get recruiter projects
export const getRecProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_RECRUITER_PROJECTS_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/project/getRecruiterProjects`,
      config
    );
    dispatch({
      type: GET_RECRUITER_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECRUITER_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Post a project
export const postAProject = (project) => async (dispatch, getState) => {
  try {
    dispatch({
      type: PROJECT_POST_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    await axios.post(`${baseURL}/api/project/createProject`, project, config);
    dispatch({
      type: PROJECT_POST_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: PROJECT_POST_RESET,
      });
    }, 3000);
  } catch (error) {
    dispatch({
      type: PROJECT_POST_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Edit a freelace project by recruiter
export const editRecProject =
  (projectId, updateProject) => async (dispatch, getState) => {
    try {
      dispatch({
        type: PROJECT_EDIT_REQUEST,
      });
      const {
        signInRec: { recInfo },
      } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${recInfo?.token}`,
        },
      };
      await axios.put(
        `${baseURL}/api/project/${projectId}`,
        updateProject,
        config
      );
      dispatch({
        type: PROJECT_EDIT_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: PROJECT_EDIT_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

// Delete a freelace project by recruiter
export const deleteRecProject = (projectId) => async (dispatch, getState) => {
  try {
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    const { data } = await axios.delete(
      `${baseURL}/api/project/${projectId}`,
      config
    );
    dispatch({
      type: PROJECT_DELETE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: PROJECT_DELETE_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: PROJECT_DELETE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get profile information
export const getRecruiterProfile = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_RECRUITER_PROFILE_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/recruiter/${recInfo._id}`,
      config
    );
    dispatch({
      type: GET_RECRUITER_PROFILE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_RECRUITER_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get profile information
export const editRecruiterProfile = (update) => async (dispatch, getState) => {
  try {
    dispatch({
      type: EDIT_RECRUITER_PROFILE_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${recInfo?.token}`,
      },
    };
    await axios.put(`${baseURL}/api/recruiter/${recInfo._id}`, update, config);
    dispatch({
      type: EDIT_RECRUITER_PROFILE_SUCCESS,
    });
    setTimeout(() => {
      dispatch({
        type: EDIT_RECRUITER_PROFILE_RESET,
      });
    }, 2000);
  } catch (error) {
    dispatch({
      type: EDIT_RECRUITER_PROFILE_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Get reset password link
export const getResetPasswordLinkRec = (email) => async (dispatch) => {
  try {
    dispatch({
      type: GET_PASSWORD_RESET_LINK_REC_REQUEST,
    });
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const { data } = await axios.post(
      `${baseURL}/api/recruiter/getResetPasswordLinkRec`,
      { email },
      config
    );
    dispatch({
      type: GET_PASSWORD_RESET_LINK_REC_SUCCESS,
      payload: data.message,
    });
    setTimeout(() => {
      dispatch({
        type: GET_PASSWORD_RESET_LINK_REC_RESET,
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
export const recResetPasswordFromLink =
  (token, newPass, conPass) => async (dispatch) => {
    try {
      dispatch({
        type: REC_RESET_PASSWORD_FROM_LINK_REQUEST,
      });
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      await axios.post(
        `${baseURL}/api/recruiter/resetPasswordFromLinkRec/${token}`,
        { newPass, conPass },
        config
      );
      dispatch({
        type: REC_RESET_PASSWORD_FROM_LINK_SUCCESS,
      });
    } catch (error) {
      dispatch({
        type: REC_RESET_PASSWORD_FROM_LINK_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };
// Reset password
export const resetPasswordRec = (newPassword) => async (dispatch, getState) => {
  try {
    dispatch({
      type: REC_RESET_PASSWORD_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recInfo.token}`,
      },
    };
    await axios.put(
      `${baseURL}/api/recruiter/resetPasswordRec/${recInfo?._id}`,
      newPassword,
      config
    );
    dispatch({
      type: REC_RESET_PASSWORD_SUCCESS,
    });
    dispatch({
      type: REC_RESET_PASSWORD_RESET,
    });
  } catch (error) {
    dispatch({
      type: REC_RESET_PASSWORD_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

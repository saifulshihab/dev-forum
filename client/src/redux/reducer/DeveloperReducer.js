import {
  DEV_SIGNUP_REQUEST,
  DEV_SIGNUP_SUCCESS,
  DEV_SIGNUP_FAIL,
  DEV_SIGNIN_REQUEST,
  DEV_SIGNIN_FAIL,
  DEV_SIGNIN_SUCCESS,
  DEV_SIGNOUT,
  GET_DEV_PROFILE_REQUEST,
  GET_DEV_PROFILE_SUCCESS,
  GET_DEV_PROFILE_FAIL,
  GET_DEV_PROFILE_RESET,
  DEV_PROFILE_DELETE_REQUEST,
  DEV_PROFILE_DELETE_SUCCESS,
  DEV_PROFILE_DELETE_FAIL,
  DEV_PROFILE_DELETE_RESET,
  DEV_PROFILE_EDIT_REQUEST,
  DEV_PROFILE_EDIT_SUCCESS,
  DEV_PROFILE_EDIT_FAIL,
  DEV_PROFILE_EDIT_RESET,
  DEV_DP_EDIT_REQUEST,
  DEV_DP_EDIT_SUCCESS,
  DEV_DP_EDIT_FAIL,
  DEV_DP_EDIT_RESET,
  DEV_COVER_EDIT_REQUEST,
  DEV_COVER_EDIT_SUCCESS,
  DEV_COVER_EDIT_FAIL,
  DEV_COVER_EDIT_RESET,
  DEV_PUBLIC_VIEW_REQUEST,
  DEV_PUBLIC_VIEW_SUCCESS,
  DEV_PUBLIC_VIEW_FAIL,
  DEV_PUBLIC_VIEW_RESET,
  GET_USER_PROJECT_REQUEST,
  GET_USER_PROJECT_SUCCESS,
  GET_USER_PROJECT_FAILED,
  ADD_USER_PROJECT_REQUEST,
  ADD_USER_PROJECT_SUCCESS,
  DELETE_USER_PROJECT_SUCCESS,
  ADD_USER_PROJECT_FAILED,
  DELETE_USER_PROJECT_FAILED,
  EDIT_USER_PROJECT_SUCCESS,
  EDIT_USER_PROJECT_FAILED,
  GET_DEVELOPERS_REQUEST,
  GET_DEVELOPERS_SUCCESS,
  GET_DEVELOPERS_FAILED,
  FOLLOW_REQUEST,
  FOLLOW_SUCCESS,
  FOLLOW_FAILED,
  GET_FOLLOWERS_REQUEST,
  GET_FOLLOWERS_SUCCESS,
  GET_FOLLOWERS_FAILED,
  UNFOLLOW_REQUEST,
  UNFOLLOW_SUCCESS,
  UNFOLLOW_FAILED,
} from '../ActionTypes';

export const devSignupReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_SIGNUP_REQUEST:
      return { loading: true };
    case DEV_SIGNUP_SUCCESS:
      return { loading: false, success: true };
    case DEV_SIGNUP_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const devSigninReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_SIGNIN_REQUEST:
      return { loading: true };
    case DEV_SIGNIN_SUCCESS:
      return {
        loading: false,
        devInfo: action.payload,
        isAuthenticated: true,
      };
    case DEV_SIGNIN_FAIL:
      return { loading: false, error: action.payload, isAuthenticated: false };
    case DEV_SIGNOUT:
      return {};
    default:
      return state;
  }
};

export const devProfileReducer = (
  state = { user: { social: [], education: [], experience: [] } },
  action
) => {
  switch (action.type) {
    case GET_DEV_PROFILE_REQUEST:
      return { loading: true };
    case GET_DEV_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case GET_DEV_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case GET_DEV_PROFILE_RESET:
      return { user: { social: [], education: [], experience: [] } };
    default:
      return state;
  }
};

export const devProfileDelReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_PROFILE_DELETE_REQUEST:
      return { loading: true };
    case DEV_PROFILE_DELETE_SUCCESS:
      return { loading: false, success: true };
    case DEV_PROFILE_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case DEV_PROFILE_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const devProfileEditReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_PROFILE_EDIT_REQUEST:
      return { loading: true };
    case DEV_PROFILE_EDIT_SUCCESS:
      return { loading: false, success: true, user: action.payload };
    case DEV_PROFILE_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case DEV_PROFILE_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const devProfileDpEditReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_DP_EDIT_REQUEST:
      return { loading: true };
    case DEV_DP_EDIT_SUCCESS:
      return { loading: false, success: true };
    case DEV_DP_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case DEV_DP_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const devProfileCoverEditReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_COVER_EDIT_REQUEST:
      return { loading: true };
    case DEV_COVER_EDIT_SUCCESS:
      return { loading: false, success: true };
    case DEV_COVER_EDIT_FAIL:
      return { loading: false, error: action.payload };
    case DEV_COVER_EDIT_RESET:
      return {};
    default:
      return state;
  }
};

export const devPublicViewReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_PUBLIC_VIEW_REQUEST:
      return { loading: true };
    case DEV_PUBLIC_VIEW_SUCCESS:
      return { loading: false, user: action.payload };
    case DEV_PUBLIC_VIEW_FAIL:
      return { loading: false, error: action.payload };
    case DEV_PUBLIC_VIEW_RESET:
      return {};
    default:
      return state;
  }
};

export const getUserProjectsReducer = (state = { projects: [] }, action) => {
  switch (action.type) {
    case GET_USER_PROJECT_REQUEST:
      return { loading: true };
    case ADD_USER_PROJECT_REQUEST:
      return { loading: true };
    case GET_USER_PROJECT_SUCCESS:
      return { loading: false, projects: action.payload };
    case ADD_USER_PROJECT_SUCCESS:
      return { loading: false, success: true };
    case EDIT_USER_PROJECT_SUCCESS:
      return { loading: false, projects: action.payload, success: true };
    case DELETE_USER_PROJECT_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_USER_PROJECT_FAILED:
      return { loading: false, error: action.payload };
    case ADD_USER_PROJECT_FAILED:
      return { loading: false, error: action.payload };
    case DELETE_USER_PROJECT_FAILED:
      return { loading: false, error: action.payload };
    case EDIT_USER_PROJECT_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getDevelopersReducer = (state = { developers: [] }, action) => {
  switch (action.type) {
    case GET_DEVELOPERS_REQUEST:
      return { loading: true };
    case GET_DEVELOPERS_SUCCESS:
      return { loading: false, developers: action.payload };
    case GET_DEVELOPERS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const followReducer = (state = {}, action) => {
  switch (action.type) {
    case FOLLOW_REQUEST:
      return { loading: true };
    case FOLLOW_SUCCESS:
      return { loading: false, success: true };
    case FOLLOW_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const unfollowReducer = (state = {}, action) => {
  switch (action.type) {
    case UNFOLLOW_REQUEST:
      return { loading: true };
    case UNFOLLOW_SUCCESS:
      return { loading: false, success: true };
    case UNFOLLOW_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getFollowersReducer = (state = { followers: [] }, action) => {
  switch (action.type) {
    case GET_FOLLOWERS_REQUEST:
      return { loading: true };
    case GET_FOLLOWERS_SUCCESS:
      return { loading: false, followers: action.payload };
    case GET_FOLLOWERS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

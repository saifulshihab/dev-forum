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
  GET_FOLLOWING_REQUEST,
  GET_FOLLOWING_SUCCESS,
  GET_FOLLOWING_FAILED,
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
  DEV_GET_CHAT_ROOMS_REQUEST,
  DEV_GET_CHAT_ROOMS_SUCCESS,
  DEV_GET_CHAT_ROOMS_FAILED,
  DEV_CREATE_CHAT_ROOM_REQUEST,
  DEV_CREATE_CHAT_ROOM_SUCCESS,
  DEV_CREATE_CHAT_ROOM_FAILED,
  DEV_CREATE_CHAT_ROOM_RESET,
  CHAT_DELETE_REQUEST,
  CHAT_DELETE_SUCCESS,
  CHAT_DELETE_FAILED,
  CHAT_DELETE_RESET,
  GET_NOTIFICATION_SUCCESS,
  GET_NOTIFICATION_FAILED,
  SEEN_NOTIFICATIONS_SUCCESS,
  SEEN_NOTIFICATIONS_FAILED,
  ADD_NEW_NOTIFICATION,
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

export const devSigninReducer = (
  state = { devInfo: {}, isAuthenticated: false },
  action
) => {
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

export const devPublicViewReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case DEV_PUBLIC_VIEW_REQUEST:
      return { loading: true };
    case DEV_PUBLIC_VIEW_SUCCESS:
      return { loading: false, user: action.payload };
    case DEV_PUBLIC_VIEW_FAIL:
      return { loading: false, error: action.payload };
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

export const getFollowingReducer = (state = { following: [] }, action) => {
  switch (action.type) {
    case GET_FOLLOWING_REQUEST:
      return { loading: true };
    case GET_FOLLOWING_SUCCESS:
      return { loading: false, following: action.payload };
    case GET_FOLLOWING_FAILED:
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

export const getCircularReducer = (state = { circulars: [] }, action) => {
  switch (action.type) {
    case GET_CIRCULAR_REQUEST:
      return { loading: true };
    case GET_CIRCULAR_SUCCESS:
      return { loading: false, circulars: action.payload };
    case GET_CIRCULAR_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const changeWorkStatusReducer = (state = {}, action) => {
  switch (action.type) {
    case CHANGE_WORK_STATUS_REQUEST:
      return { loading: true };
    case CHANGE_WORK_STATUS_SUCCESS:
      return { loading: false, success: true };
    case CHANGE_WORK_STATUS_FAILED:
      return { loading: false, error: action.payload };
    case CHANGE_WORK_STATUS_RESET:
      return {};
    default:
      return state;
  }
};

export const resetPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_RESET_PASSWORD_REQUEST:
      return { loading: true };
    case DEV_RESET_PASSWORD_SUCCESS:
      return { loading: false, success: true };
    case DEV_RESET_PASSWORD_FAILED:
      return { loading: false, error: action.payload };
    case DEV_RESET_PASSWORD_RESET:
      return {};
    default:
      return state;
  }
};

export const getResetLinkDevReducer = (state = {}, action) => {
  switch (action.type) {
    case GET_PASSWORD_RESET_LINK_DEV_REQUEST:
      return { loading: true };
    case GET_PASSWORD_RESET_LINK_DEV_SUCCESS:
      return { loading: false, success: true, message: action.payload };
    case GET_PASSWORD_RESET_LINK_DEV_FAILED:
      return { loading: false, error: action.payload };
    case GET_PASSWORD_RESET_LINK_DEV_RESET:
      return {};
    default:
      return state;
  }
};

export const resetPasswordFromLinkReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_RESET_PASSWORD_FROM_LINK_REQUEST:
      return { loading: true };
    case DEV_RESET_PASSWORD_FROM_LINK_SUCCESS:
      return { loading: false, success: true };
    case DEV_RESET_PASSWORD_FROM_LINK_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getChatRoomsReducer = (state = { rooms: [] }, action) => {
  switch (action.type) {
    case DEV_GET_CHAT_ROOMS_REQUEST:
      return { loading: true };
    case DEV_GET_CHAT_ROOMS_SUCCESS:
      return { loading: false, rooms: action.payload };
    case DEV_GET_CHAT_ROOMS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const devCreateChatRoomReducer = (state = {}, action) => {
  switch (action.type) {
    case DEV_CREATE_CHAT_ROOM_REQUEST:
      return { loading: true };
    case DEV_CREATE_CHAT_ROOM_SUCCESS:
      return { loading: false, success: true };
    case DEV_CREATE_CHAT_ROOM_FAILED:
      return { loading: false, error: action.payload };
    case DEV_CREATE_CHAT_ROOM_RESET:
      return {};
    default:
      return state;
  }
};

export const chatDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case CHAT_DELETE_REQUEST:
      return { loading: true };
    case CHAT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case CHAT_DELETE_FAILED:
      return { loading: false, error: action.payload };
    case CHAT_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const getNotificationsReducer = (
  state = { notifications: [] },
  action
) => {
  switch (action.type) {
    case GET_NOTIFICATION_SUCCESS:
      return { notifications: action.payload };
    case ADD_NEW_NOTIFICATION:
      return { notifications: [action.payload, ...state.notifications] };
    case GET_NOTIFICATION_FAILED:
      return { error: action.payload };

    default:
      return state;
  }
};

export const seenNotificationReducer = (state = { seen: false }, action) => {
  switch (action.type) {
    case SEEN_NOTIFICATIONS_SUCCESS:
      return { seen: true };
    case SEEN_NOTIFICATIONS_FAILED:
      return { error: action.payload };
    default:
      return state;
  }
};

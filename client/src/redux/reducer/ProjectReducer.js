import {
  GET_FREELANCE_PROJECTS_FAILED,
  GET_FREELANCE_PROJECTS_REQUEST,
  GET_FREELANCE_PROJECTS_SUCCESS,
} from '../ActionTypes';

export const getFreelanceProjectsReducer = (
  state = { projects: [] },
  action
) => {
  switch (action.type) {
    case GET_FREELANCE_PROJECTS_REQUEST:
      return { loading: true };
    case GET_FREELANCE_PROJECTS_SUCCESS:
      return { loading: false, projects: action.payload };
    case GET_FREELANCE_PROJECTS_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

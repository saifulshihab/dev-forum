import {
  GET_FREELANCE_PROJECTS_FAILED,
  GET_FREELANCE_PROJECTS_REQUEST,
  GET_FREELANCE_PROJECTS_SUCCESS,
  SEND_PROPOSAL_FAILED,
  SEND_PROPOSAL_REQUEST,
  SEND_PROPOSAL_SUCCESS,
  SEND_PROPOSAL_RESET,
  GET_PROJECT_PROPOSAL_REQUEST,
  GET_PROJECT_PROPOSAL_SUCCESS,
  GET_PROJECT_PROPOSAL_FAILED,
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

export const sendProposalReducer = (state = {}, action) => {
  switch (action.type) {
    case SEND_PROPOSAL_REQUEST:
      return { loading: true };
    case SEND_PROPOSAL_SUCCESS:
      return { loading: false, success: true };
    case SEND_PROPOSAL_FAILED:
      return { loading: false, error: action.payload };
    case SEND_PROPOSAL_RESET:
      return {};
    default:
      return state;
  }
};

export const getProjectProposalReducer = (
  state = { proposals: [] },
  action
) => {
  switch (action.type) {
    case GET_PROJECT_PROPOSAL_REQUEST:
      return { loading: true };
    case GET_PROJECT_PROPOSAL_SUCCESS:
      return { loading: false, proposals: action.payload };
    case GET_PROJECT_PROPOSAL_FAILED:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

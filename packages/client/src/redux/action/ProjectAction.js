import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  GET_FREELANCE_PROJECTS_FAILED,
  GET_FREELANCE_PROJECTS_REQUEST,
  GET_FREELANCE_PROJECTS_SUCCESS,
  GET_PROJECT_PROPOSAL_FAILED,
  GET_PROJECT_PROPOSAL_REQUEST,
  GET_PROJECT_PROPOSAL_SUCCESS,
  SEND_PROPOSAL_FAILED,
  SEND_PROPOSAL_REQUEST,
  SEND_PROPOSAL_RESET,
  SEND_PROPOSAL_SUCCESS,
} from '../ActionTypes';

// Get freelance projects by developer
export const getFreelanceProjects = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_FREELANCE_PROJECTS_REQUEST,
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
      `${baseURL}/api/project/getFreelanceProjects`,
      config
    );
    dispatch({
      type: GET_FREELANCE_PROJECTS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_FREELANCE_PROJECTS_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
// Send proposal for project
export const sendProjectProposal =
  (projectId, project) => async (dispatch, getState) => {
    try {
      dispatch({
        type: SEND_PROPOSAL_REQUEST,
      });
      const {
        signInDev: { devInfo },
      } = getState();

      const config = {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${devInfo.token}`,
        },
      };
      await axios.post(
        `${baseURL}/api/project/sendProjectProposal/${projectId}`,
        project,
        config
      );
      dispatch({
        type: SEND_PROPOSAL_SUCCESS,
      });
      setTimeout(() => {
        dispatch({
          type: SEND_PROPOSAL_RESET,
        });
      }, 2000);
    } catch (error) {
      dispatch({
        type: SEND_PROPOSAL_FAILED,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
      setTimeout(() => {
        dispatch({
          type: SEND_PROPOSAL_RESET,
        });
      }, 2000);
    }
  };
// Get project proposal by recruiter
export const getProjectProposal = (projectId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: GET_PROJECT_PROPOSAL_REQUEST,
    });
    const {
      signInRec: { recInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${recInfo.token}`,
      },
    };
    const { data } = await axios.get(
      `${baseURL}/api/project/getProjectProposals/${projectId}`,
      config
    );
    dispatch({
      type: GET_PROJECT_PROPOSAL_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: GET_PROJECT_PROPOSAL_FAILED,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

import axios from 'axios';
import { baseURL } from '../../baseURL';
import {
  GET_FREELANCE_PROJECTS_FAILED,
  GET_FREELANCE_PROJECTS_REQUEST,
  GET_FREELANCE_PROJECTS_SUCCESS,
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

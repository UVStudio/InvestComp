import axios from 'axios';

import { GET_PROFILES, PROFILES_ERROR } from './types';

export const getAllProfiles = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/profile/');
    dispatch({
      type: GET_PROFILES,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILES_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

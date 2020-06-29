import axios from 'axios';
import { setAlert } from '../Actions/alert';

import { UPDATE_ALL, UPDATE_ALL_FAIL } from './types';

export const updateAllAccounts = () => async (dispatch) => {
  try {
    const res = await axios.put('/api/admin/balance');
    dispatch({
      type: UPDATE_ALL,
      payload: res.data,
    });
    dispatch(setAlert('Accounts updated', 'success'));
  } catch (error) {
    dispatch({
      type: UPDATE_ALL_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

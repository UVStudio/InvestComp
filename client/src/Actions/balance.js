import axios from 'axios';
import { setAlert } from './alert';

import { BALANCE_UPDATE, BALANCE_ERROR } from './types';

export const getBalanceUpdate = () => async (dispatch) => {
  try {
    const res = await axios.put('/api/balance');
    dispatch({
      type: BALANCE_UPDATE,
      payload: res.data,
    });
    dispatch(setAlert('Balance updated', 'success'));
  } catch (error) {
    dispatch({
      type: BALANCE_ERROR,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

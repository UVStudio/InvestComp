import axios from 'axios';

import { BALANCE_UPDATE, BALANCE_ERROR } from './types';

export const getBalanceUpdate = () => async (dispatch) => {
  try {
    const res = await axios.put('/api/balance');
    dispatch({
      type: BALANCE_UPDATE,
      payload: res.data,
    });
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

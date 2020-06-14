import axios from 'axios';

import { ADMIN_DELETE_TRANS, ADMIN_DELETE_TRANS_FAIL } from './types';

export const deleteTransaction = (profileId, transId) => async (dispatch) => {
  console.log('actioned');
  try {
    const res = await axios.delete(
      `/api/admin/${profileId}/transactions/${transId}`
    );
    dispatch({
      type: ADMIN_DELETE_TRANS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETE_TRANS_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

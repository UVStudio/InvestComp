import { TRANSACTION_ALERT, REMOVE_TRANSACTION_ALERT } from './types';

export const transAlert = (msg, alertType) => (dispatch) => {
  dispatch({
    type: TRANSACTION_ALERT,
    payload: { msg, alertType },
  });

  setTimeout(() => dispatch({ type: REMOVE_TRANSACTION_ALERT }), 5000);
};

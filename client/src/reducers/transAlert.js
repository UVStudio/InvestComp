import { TRANSACTION_ALERT, REMOVE_TRANSACTION_ALERT } from '../Actions/types';
const initialState = {
  msg: '',
  alertType: '',
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case TRANSACTION_ALERT:
      return {
        msg: payload.msg,
        alertType: payload.alertType,
      };
    case REMOVE_TRANSACTION_ALERT:
      return {
        msg: '',
        alertType: '',
      };
    default:
      return state;
  }
}

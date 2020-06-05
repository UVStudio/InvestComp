import { BUY_ORDER, BUY_FAIL } from '../Actions/types';
import { SELL_ORDER, SELL_FAIL } from '../Actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUY_ORDER:
    case SELL_ORDER:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case BUY_FAIL:
    case SELL_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

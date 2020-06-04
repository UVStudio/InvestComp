import { BUY_ORDER, BUY_FAIL } from '../Actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BUY_ORDER:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case BUY_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

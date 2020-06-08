import { SYMBOL_SEARCH, SYMBOL_FAIL } from '../Actions/types';
const initialState = {
  symbol: '',
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SYMBOL_SEARCH:
      return {
        ...state,
        symbol: payload,
        loading: false,
      };
    case SYMBOL_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

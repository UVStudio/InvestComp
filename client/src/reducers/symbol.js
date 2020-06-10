import {
  SYMBOL_SEARCH,
  SYMBOL_FAIL,
  GET_SYMBOLS,
  GET_SYMBOLS_FAIL,
} from '../Actions/types';
const initialState = {
  symbol: '',
  symbols: [],
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
    case GET_SYMBOLS:
      return {
        ...state,
        symbols: payload,
      };
    case SYMBOL_FAIL:
    case GET_SYMBOLS_FAIL:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

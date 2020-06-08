import axios from 'axios';

import { SYMBOL_SEARCH, SYMBOL_FAIL } from './types';

export const getSymbol = (stock) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/symbol/${stock}`);
    dispatch({
      type: SYMBOL_SEARCH,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SYMBOL_FAIL,
    });
  }
};

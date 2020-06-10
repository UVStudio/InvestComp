import axios from 'axios';

import {
  SYMBOL_SEARCH,
  SYMBOL_FAIL,
  GET_SYMBOLS,
  GET_SYMBOLS_FAIL,
} from './types';

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

export const getSymbols = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/symbol/`);
    dispatch({
      type: GET_SYMBOLS,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: GET_SYMBOLS_FAIL,
    });
  }
};

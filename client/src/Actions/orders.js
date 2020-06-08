import axios from 'axios';
import { BUY_ORDER, BUY_FAIL } from './types';
import { SELL_ORDER, SELL_FAIL } from './types';

export const buyStock = ({ buysell, amount, stock }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ buysell, amount, stock });
  try {
    const res = await axios.post('/api/transactions/buy', body, config);
    dispatch({
      type: BUY_ORDER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: BUY_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

export const sellStock = ({ buysell, shares, stock }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ buysell, shares, stock });
  try {
    const res = await axios.post('/api/transactions/sell', body, config);
    dispatch({
      type: SELL_ORDER,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: SELL_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};
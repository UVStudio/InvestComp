import axios from 'axios';
import { BUY_ORDER, BUY_FAIL } from './types';
import { SELL_ORDER, SELL_FAIL } from './types';
import { getBalanceUpdate } from './balance';
import { getCurrentProfile } from './profile';
import { transAlert } from '../Actions/transAlert';

export const buyStock = ({ buysell, amount, stock, shares }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ buysell, amount, stock, shares });
  try {
    const res = await axios.post('/api/transactions/buy', body, config);
    dispatch({
      type: BUY_ORDER,
      payload: res.data,
    });
    await dispatch(getBalanceUpdate());
    dispatch(getCurrentProfile());
    dispatch(
      transAlert(
        `You have purchased ${
          amount ? '$ ' + amount : shares + ' shares'
        } of ${stock}. Please refresh portfolio.`,
        'success'
      )
    );
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

export const sellStock = ({ buysell, shares, stock, amount }) => async (
  dispatch
) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ buysell, shares, stock, amount });
  try {
    const res = await axios.post('/api/transactions/sell', body, config);
    dispatch({
      type: SELL_ORDER,
      payload: res.data,
    });
    await dispatch(getBalanceUpdate());
    dispatch(getCurrentProfile());
    dispatch(
      transAlert(
        `You have sold ${
          shares ? shares + ' shares' : '$ ' + amount
        } of ${stock}. Please refresh portfolio.`,
        'success'
      )
    );
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

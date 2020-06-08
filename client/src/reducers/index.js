import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import balance from './balance';
import orders from './orders';
import transAlert from './transAlert';
import symbol from './symbol';

export default combineReducers({
  alert,
  auth,
  profile,
  balance,
  orders,
  transAlert,
  symbol,
});

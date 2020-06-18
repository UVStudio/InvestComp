import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import profiles from './profiles';
import balance from './balance';
import orders from './orders';
import transAlert from './transAlert';
import symbol from './symbol';
import admin from './admin';
import deleteTrans from './deleteTrans';

export default combineReducers({
  alert,
  auth,
  profile,
  profiles,
  balance,
  orders,
  transAlert,
  symbol,
  admin,
  deleteTrans,
});

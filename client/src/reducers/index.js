import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import profile from './profile';
import balance from './balance';
import orders from './orders';

export default combineReducers({ alert, auth, profile, balance, orders });

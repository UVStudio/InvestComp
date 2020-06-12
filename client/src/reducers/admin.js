import {
  ADMIN_AUTH,
  ADMIN_AUTH_FAIL,
  ADMIN_SIGNUP,
  ADMIN_SIGNUP_FAIL,
  ADMIN_LOGIN,
  ADMIN_LOGIN_FAIL,
  ADMIN_LOGOUT,
  ADMIN_LOGOUT,
} from '../Actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  admin: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case ADMIN_AUTH:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        admin: payload,
      };
    case ADMIN_SIGNUP:
    case ADMIN_LOGIN:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case ADMIN_AUTH_FAIL:
    case ADMIN_SIGNUP_FAIL:
    case ADMIN_LOGIN_FAIL:
    case ADMIN_LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
}

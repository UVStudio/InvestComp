import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  PROFILE_LOADED,
  AUTH_ERROR,
} from '../Actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  profile: null,
};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case PROFILE_LOADED:
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        profile: payload,
      };
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        ...payload,
        isAuthenticated: true,
        loading: false,
      };
    case REGISTER_FAIL:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: true,
        loading: false,
      };
    default:
      return state;
  }
}

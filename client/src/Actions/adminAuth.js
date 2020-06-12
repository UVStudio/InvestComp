import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  ADMIN_AUTH,
  ADMIN_AUTH_FAIL,
  ADMIN_SIGNUP,
  ADMIN_SIGNUP_FAIL,
} from './types';

//Load admin
export const loadAdmin = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  try {
    const res = await axios.get('api/admin/register');
    dispatch({
      type: ADMIN_AUTH,
      payload: res.data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_AUTH_FAIL,
    });
  }
};

//Register admin
export const register = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });

  try {
    const res = await axios.post('/api/profile', body, config);
    dispatch({
      type: ADMIN_SIGNUP,
      payload: res.data,
    });
    dispatch(loadProfile());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: ADMIN_SIGNUP_FAIL,
      payload: {
        msg: error.response.statusText,
        status: error.response.status,
      },
    });
  }
};

//Login admin
export const login = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });

  try {
    const res = await axios.post('/api/auth', body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });
    dispatch(loadProfile());
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
    }
    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

//Log out / clear profile

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

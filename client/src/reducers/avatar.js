import {
  AVATAR_ERROR,
  AVATAR_SERVED,
  AVATAR_UPLOAD,
  AVATAR_UPLOAD_ERROR,
} from '../actions/types';

const initialState = {};

export default function (state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case AVATAR_SERVED:
    case AVATAR_UPLOAD:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case AVATAR_ERROR:
    case AVATAR_UPLOAD_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
}

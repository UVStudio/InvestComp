import { ADMIN_DELETE_TRANS, ADMIN_DELETE_TRANS_FAIL } from '../Actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case ADMIN_DELETE_TRANS:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case ADMIN_DELETE_TRANS_FAIL:
      return {
        ...state,
        profile: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

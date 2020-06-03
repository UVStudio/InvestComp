import { BALANCE_UPDATE, BALANCE_ERROR } from '../Actions/types';

const initialState = {
  profile: null,
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case BALANCE_UPDATE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case BALANCE_ERROR:
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

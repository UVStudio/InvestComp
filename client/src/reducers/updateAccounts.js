import { UPDATE_ALL, UPDATE_ALL_FAIL } from '../Actions/types';

const initialState = {
  profiles: [],
  loading: true,
  error: {},
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case UPDATE_ALL:
      return {
        ...state,
        profiles: payload,
        loading: false,
      };
    case UPDATE_ALL_FAIL:
      return {
        ...state,
        profiles: null,
        loading: false,
        error: payload,
      };
    default:
      return state;
  }
}

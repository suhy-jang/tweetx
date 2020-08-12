import { PROFILE_LOADING, GET_PROFILE, PROFILE_ERROR } from '../actions/types';

const initialState = {
  profiles: [],
  profile: {},
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case PROFILE_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_PROFILE:
      return {
        ...state,
        profile: payload,
        loading: false,
      };
    case PROFILE_ERROR:
      return {
        ...state,
        profile: {},
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

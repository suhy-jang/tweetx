import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EDIT_USER,
  FOLLOW,
  UNFOLLOW,
  UNREGISTER,
  LOGOUT,
  AUTH_ERROR,
  AUTH_LOADING,
  RESET_PASSWORD_CONFIRM,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  user: null,
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case AUTH_LOADING:
      return {
        ...state,
        loading: true,
      };
    case USER_LOADED:
      return {
        ...state,
        user: payload,
        isAuthenticated: true,
        loading: false,
      };
    case RESET_PASSWORD_CONFIRM:
    case REGISTER_SUCCESS:
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        user: payload.user,
        isAuthenticated: true,
        loading: false,
      };
    case EDIT_USER:
      return {
        ...state,
        user: {
          ...state.user,
          ...payload,
        },
        loading: false,
      };
    case FOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followings: [payload, ...state.user.followings],
        },
        loading: false,
      };
    case UNFOLLOW:
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter((f) => f.id !== payload.id),
        },
        loading: false,
      };
    case UNREGISTER:
    case LOGOUT:
      localStorage.removeItem(`new-post`);
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    case AUTH_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

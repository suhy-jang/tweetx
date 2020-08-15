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
  CREATE_POST,
  DELETE_POST,
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
    case CREATE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: [{ id: payload.id }, ...state.user.posts],
        },
      };
    case DELETE_POST:
      return {
        ...state,
        user: {
          ...state.user,
          posts: state.user.posts.filter((post) => post.id !== payload.id),
        },
      };
    case UNREGISTER:
    case LOGOUT:
    case AUTH_ERROR:
      return {
        ...state,
        token: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    default:
      return state;
  }
};

import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EDIT_USER,
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

const Auth = (state = initialState, action) => {
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
    case CREATE_POST:
      return {
        ...state,
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        loading: false,
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

export default Auth;

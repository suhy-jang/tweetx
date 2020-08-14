import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EDIT_USER,
  UNREGISTER,
  AUTH_ERROR,
  LOGOUT,
} from './types';
import {
  gqlCreateUser,
  gqlUpdateUser,
  gqlDeleteUser,
  gqlLogin,
  gqlMe,
} from './operations';
import { setAuthToken, setBaseUrl } from '../utils/axiosDefaults';

// Load User
export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  setBaseUrl();

  try {
    const res = await axios.post('/graphql', { query: gqlMe });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      // no alert: unloaded -> login
      return dispatch({ type: AUTH_ERROR });
    }

    dispatch({
      type: USER_LOADED,
      payload: data.me,
    });
  } catch (err) {
    console.log('auth error'); // for temp: too often logout
    // dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = ({ username, fullname, email, password }) => async (
  dispatch,
) => {
  setBaseUrl();
  const variables = {
    data: {
      username,
      fullname,
      email,
      password,
    },
  };

  try {
    const res = await axios.post('/graphql', {
      query: gqlCreateUser,
      variables,
    });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.createUser,
    });

    dispatch(setAlert('Successfully sign up', 'success'));
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Login User
export const login = ({ email, password }) => async (dispatch) => {
  setBaseUrl();
  const variables = {
    data: {
      email,
      password,
    },
  };

  try {
    const res = await axios.post('/graphql', { query: gqlLogin, variables });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.login,
    });
    dispatch(setAlert('Successfully log in', 'success'));
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const editUser = ({ fullname }, history) => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  setBaseUrl();

  const variables = {
    data: {
      fullname,
    },
  };
  try {
    const res = await axios.post('/graphql', {
      query: gqlUpdateUser,
      variables,
    });
    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({ type: EDIT_USER, payload: data.updateUser });
    history.goBack();
  } catch (err) {
    // dispatch(setAlert(err, 'danger'));
  }
};

// Logout
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};

// Unregister User
export const unregister = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  setBaseUrl();

  try {
    const res = await axios.post('/graphql', {
      query: gqlDeleteUser,
    });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }

    dispatch({
      type: UNREGISTER,
      payload: data.deleteUser,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

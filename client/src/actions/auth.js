import axios from 'axios';
import { setAlert } from './alert';
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  AUTH_ERROR,
} from './types';
import { gqlCreateUser, gqlLogin, gqlMe } from './operations';
import { setAuthToken, setBaseUrl } from '../utils/axiosDefaults';

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
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

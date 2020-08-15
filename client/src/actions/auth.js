import axios from 'axios';
import { setAlert } from './alert';
import {
  AUTH_LOADING,
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EDIT_USER,
  UNREGISTER,
  AUTH_ERROR,
  LOGOUT,
  FOLLOW,
  UNFOLLOW,
  RESET_PASSWORD_CONFIRM,
} from './types';
import {
  gqlCreateUser,
  gqlUpdateUser,
  gqlFollow,
  gqlUnfollow,
  gqlDeleteUser,
  gqlLogin,
  gqlMe,
  gqlForgotPassword,
  gqlResetPassword,
} from './operations';
import { setAuthToken } from '../utils/axiosDefaults';

const authIn = (token, dispatch) => {
  localStorage.setItem('token', token);
  setAuthToken(token);
};

const authOut = () => {
  localStorage.removeItem(`new-post`);
  localStorage.removeItem('token');
  setAuthToken();
};

// Load User
export const loadUser = () => async (dispatch) => {
  setAuthToken(localStorage.token);

  try {
    const res = await axios.post('/graphql', { query: gqlMe });

    const {
      data: { data },
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
    dispatch({ type: AUTH_ERROR });
  }
};

// Register User
export const register = (
  { username, fullname, email, password },
  { successMsg },
) => async (dispatch) => {
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

    authIn(data.createUser.token, dispatch);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.createUser,
    });

    dispatch(setAlert(successMsg, 'success'));
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Login User
export const login = ({ email, password }, { successMsg }) => async (
  dispatch,
) => {
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

    authIn(data.login.token, dispatch);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: data.login,
    });
    dispatch(setAlert(successMsg, 'success'));
    dispatch(loadUser());
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const editUser = ({ fullname }, history) => async (dispatch) => {
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
    dispatch(setAlert('Update failed', 'danger'));
  }
};

// Logout
export const logout = () => (dispatch) => {
  authOut();
  dispatch({ type: LOGOUT });
};

// Unregister User
export const unregister = () => async (dispatch) => {
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

    authOut();

    dispatch({
      type: UNREGISTER,
      payload: data.deleteUser,
    });
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

export const follow = (id, setFollowStatus) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  const variables = { id: id };

  try {
    const res = await axios.post('/graphql', { query: gqlFollow, variables });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({
      type: FOLLOW,
      payload: data.follow,
    });
    setFollowStatus(true);
  } catch (err) {
    dispatch(setAlert('Failed follow', 'danger'));
  }
};

export const unfollow = (id, setFollowStatus) => async (dispatch) => {
  dispatch({ type: AUTH_LOADING });

  const variables = { id: id };

  try {
    const res = await axios.post('/graphql', { query: gqlUnfollow, variables });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({
      type: UNFOLLOW,
      payload: data.unfollow,
    });

    setFollowStatus(false);
  } catch (err) {
    dispatch(setAlert('Failed unfollow', 'danger'));
  }
};

// Reset password
export const resetPassword = ({ email }, successMsg, history) => async (
  dispatch,
) => {
  const variables = {
    data: {
      email,
    },
  };

  try {
    const res = await axios.post('/graphql', {
      query: gqlForgotPassword,
      variables,
    });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }
    dispatch(setAlert(successMsg, 'success'));
    history.push('/');
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Reset password confirm
export const resetPasswordConfirm = (
  { resetToken, password },
  { successMsg },
  history,
) => async (dispatch) => {
  const variables = {
    data: {
      resetToken,
      password,
    },
  };

  try {
    const res = await axios.post('/graphql', {
      query: gqlResetPassword,
      variables,
    });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }

    authIn(data.resetPassword.token, dispatch);

    dispatch({
      type: RESET_PASSWORD_CONFIRM,
      payload: data.resetPassword,
    });

    dispatch(setAlert(successMsg, 'success'));

    dispatch(loadUser());

    history.push('/');
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

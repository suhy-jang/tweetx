import client from '../utils/apolloClient';
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
  mutateCreateUser,
  mutateUpdateUser,
  mutateFollow,
  mutateUnfollow,
  mutateDeleteUser,
  mutateLogin,
  queryMe,
  mutateForgotPassword,
  mutateResetPassword,
  mutateFileUploadSign,
} from './operations';

const authIn = (token) => {
  localStorage.setItem('token', token);
};

const authOut = () => {
  localStorage.removeItem(`new-post`);
  localStorage.removeItem('token');
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await client.query({ query: queryMe });

    const { data } = res;

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
export const register =
  ({ username, fullname, email, password }, { successMsg }) =>
  async (dispatch) => {
    const variables = {
      data: {
        username,
        fullname,
        email,
        password,
      },
    };

    try {
      const res = await client.mutate({
        mutation: mutateCreateUser,
        variables,
      });

      const { data, errors } = res;

      if (!data) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return dispatch({ type: AUTH_ERROR });
      }

      authIn(data.createUser.token);

      dispatch({
        type: REGISTER_SUCCESS,
        payload: data.createUser,
      });

      dispatch(setAlert(successMsg, 'success'));
      dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
      dispatch({ type: AUTH_ERROR });
    }
  };

// Login User
export const login =
  ({ email, password }, { successMsg }) =>
  async (dispatch) => {
    const variables = {
      data: {
        email,
        password,
      },
    };

    try {
      const res = await client.mutate({ mutation: mutateLogin, variables });

      const { data, errors } = res;

      if (!data) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return dispatch({ type: AUTH_ERROR });
      }

      authIn(data.login.token);

      dispatch({
        type: LOGIN_SUCCESS,
        payload: data.login,
      });
      dispatch(setAlert(successMsg, 'success'));
      dispatch(loadUser());
    } catch (err) {
      dispatch(setAlert(err.message, 'danger'));
      dispatch({ type: AUTH_ERROR });
    }
  };

export const uploadUserPhoto = (file) => async (dispatch) => {
  const { name, size, type } = file;
  const variables = {
    data: {
      name,
      size,
      type,
    },
  };
  try {
    const res1 = await client.mutate({
      mutation: mutateFileUploadSign,
      variables,
    });

    const { data, errors } = res1;

    if (!data) {
      return dispatch(setAlert(errors, 'danger'));
    }

    const { res: res2, url } = data.fileUploadSign;

    if (res2 !== 200) {
      return dispatch(setAlert('Failed file upload', 'danger'));
    }

    return url;
  } catch (err) {
    dispatch(setAlert('Failed file upload', 'danger'));
  }
};

export const editUser =
  ({ fullname, photoUrl }, { successMsg }, history) =>
  async (dispatch) => {
    const variables = {
      data: {
        fullname,
        photoUrl,
      },
    };

    try {
      const res = await client.mutate({
        mutation: mutateUpdateUser,
        variables,
      });

      const { data, errors } = res;

      if (!data) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return;
      }

      dispatch({ type: EDIT_USER, payload: data.updateUser });
      history.goBack();

      dispatch(setAlert(successMsg, 'success'));
      loadUser();
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
    const res = await client.mutate({ mutation: mutateDeleteUser });

    const { data, errors } = res;

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
    const res = await client.mutate({ mutation: mutateFollow, variables });

    const { data, errors } = res;

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
    const res = await client.mutate({ mutation: mutateUnfollow, variables });

    const { data, errors } = res;

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
export const resetPassword =
  ({ email }, successMsg, callback) =>
  async (dispatch) => {
    const variables = {
      data: {
        email,
      },
    };

    try {
      const res = await client.mutate({
        mutation: mutateForgotPassword,
        variables,
      });

      const { data, errors } = res;

      if (!data) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return dispatch({ type: AUTH_ERROR });
      }
      dispatch(setAlert(successMsg, 'success'));
      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

// Reset password confirm
export const resetPasswordConfirm =
  ({ resetToken, password }, { successMsg }, callback) =>
  async (dispatch) => {
    const variables = {
      data: {
        resetToken,
        password,
      },
    };

    try {
      const res = await client.mutate({
        mutation: mutateResetPassword,
        variables,
      });

      const { data, errors } = res;

      if (!data) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return dispatch({ type: AUTH_ERROR });
      }

      authIn(data.resetPassword.token);

      dispatch({
        type: RESET_PASSWORD_CONFIRM,
        payload: data.resetPassword,
      });

      dispatch(setAlert(successMsg, 'success'));

      dispatch(loadUser());

      callback();
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

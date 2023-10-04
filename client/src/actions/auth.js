import client from '../utils/apolloClient';
import { setAlert } from './alert';
import {
  USER_LOADED,
  REGISTER_SUCCESS,
  LOGIN_SUCCESS,
  EDIT_USER,
  UNREGISTER,
  AUTH_ERROR,
  LOGOUT,
  RESET_PASSWORD_CONFIRM,
  EMAIL_VERIFIED,
} from './types';
import {
  mutateCreateUser,
  mutateVerifyEmail,
  mutateEmailVerificationCheck,
  mutateUpdateUser,
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
  client.clearStore();
};

// Load User
export const loadUser = () => async (dispatch) => {
  try {
    const res = await client.query({ query: queryMe });

    const { data, errors } = res;

    if (errors) {
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

// Verify Email
export const verifyEmail =
  ({ email, isRegistering, successMsg }, callback) =>
  async (dispatch) => {
    const variables = { email, isRegistering };

    try {
      const res = await client.mutate({
        mutation: mutateVerifyEmail,
        variables,
        fetchPolicy: 'no-cache',
      });
      const { errors } = res;

      if (errors) {
        if (errors.extensions) {
          errors.forEach((err) =>
            dispatch(setAlert(err.extensions.originalError.message, 'danger')),
          );
        }
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));

        return dispatch({ type: AUTH_ERROR });
      }

      if (successMsg) {
        dispatch(setAlert(successMsg, 'success'));
      }

      callback?.();
    } catch (error) {
      dispatch(setAlert(error.message, 'danger'));
      dispatch({ type: AUTH_ERROR });
    }
  };

// Check Email Verification
export const checkEmailVerification = () => async (dispatch) => {
  try {
    const res = await client.mutate({
      mutation: mutateEmailVerificationCheck,
      fetchPolicy: 'no-cache',
    });
    const { data, errors } = res;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return;
    }

    const { success: payload, message } = data.checkEmailVerification;

    if (message) {
      dispatch(setAlert(`Email is unverified with reason: ${message}`));
    }

    dispatch({
      type: EMAIL_VERIFIED,
      payload,
    });
  } catch (error) {
    dispatch(setAlert(error.message, 'danger'));
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

      if (errors) {
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

      if (errors) {
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
    const get_sign_response = await client.mutate({
      mutation: mutateFileUploadSign,
      variables,
    });

    const { data, errors } = get_sign_response;
    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return;
    }

    const { presignedUrl } = data.fileUploadSign;
    if (!presignedUrl) {
      return dispatch(setAlert('Failed to get presigned url', 'danger'));
    }

    const put_response = await fetch(presignedUrl, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (put_response.status !== 200) {
      return dispatch(setAlert('Failed to upload an image', 'danger'));
    }

    const [imageUrl, _] = put_response.url.split('?');

    return imageUrl;
  } catch (err) {
    dispatch(setAlert('Failed file upload', 'danger'));
  }
};

export const editUser =
  ({ fullname, photoUrl }, { successMsg }, callback) =>
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

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return;
      }

      dispatch({ type: EDIT_USER, payload: data.updateUser });

      dispatch(setAlert(successMsg, 'success'));
      loadUser();
      callback?.();
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
export const unregister = (successMsg) => async (dispatch) => {
  try {
    const res = await client.mutate({ mutation: mutateDeleteUser });

    const { data, errors } = res;

    if (errors) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: AUTH_ERROR });
    }

    authOut();

    dispatch({
      type: UNREGISTER,
      payload: data.deleteUser,
    });
    dispatch(setAlert(successMsg, 'success'));
  } catch (err) {
    dispatch({ type: AUTH_ERROR });
  }
};

// Reset password
export const resetPassword =
  ({ email, successMsg, callback }) =>
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

      const { errors } = res;

      if (errors) {
        errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
        return dispatch({ type: AUTH_ERROR });
      }
      dispatch(setAlert(successMsg, 'success'));
      callback();
    } catch (err) {
      const message = err.message;
      dispatch(setAlert(message, 'danger'));
      dispatch({ type: AUTH_ERROR });
    }
  };

// Reset password confirm
export const resetPasswordConfirm =
  ({ resetToken, password, successMsg }) =>
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
        fetchPolicy: 'no-cache',
      });

      const { data, errors } = res;

      if (errors) {
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
    } catch (err) {
      dispatch({ type: AUTH_ERROR });
    }
  };

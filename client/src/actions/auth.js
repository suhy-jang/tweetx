import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_SUCCESS, REGISTER_FAILURE } from './types';
import { gqlCreateUser } from './operations';

// Register User
export const register = ({ username, fullname, email, password }) => async (
  dispatch,
) => {
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
      return dispatch({ type: REGISTER_FAILURE });
    }

    dispatch({
      type: REGISTER_SUCCESS,
      payload: data.createUser,
    });

    dispatch(setAlert('Successfully sign up', 'success'));
    // dispatch(loadUser())
  } catch (err) {
    dispatch({
      type: REGISTER_FAILURE,
      payload: { msg: err.statusText, status: err.status },
    });
  }
};

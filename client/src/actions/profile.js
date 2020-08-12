import axios from 'axios';
import { setAlert } from './alert';
import { PROFILE_LOADING, GET_PROFILE, PROFILE_ERROR } from './types';
import { gqlUser } from './operations';
import { setBaseUrl } from '../utils/axiosDefaults';

// Get Profile User
export const getProfile = (id) => async (dispatch) => {
  setBaseUrl();

  dispatch({ type: PROFILE_LOADING });
  const variables = { id };

  try {
    const res = await axios.post('/graphql', { query: gqlUser, variables });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: PROFILE_ERROR });
    }

    dispatch({
      type: GET_PROFILE,
      payload: data.user,
    });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

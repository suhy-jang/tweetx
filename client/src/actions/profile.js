import axios from 'axios';
import { setAlert } from './alert';
import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
} from './types';
import { gqlUser, gqlUsers } from './operations';

// Get Profile User
export const getProfile = (id) => async (dispatch) => {
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

// Get Unfollowed Users list
export const unfollowedUsers = (id) => async (dispatch) => {
  const variables = {
    where: {
      id_not: id,
      followers_none: {
        follower: {
          id,
        },
      },
    },
  };

  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await axios.post('/graphql', { query: gqlUsers, variables });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: PROFILE_ERROR });
    }

    dispatch({
      type: GET_PROFILES,
      payload: data.users,
    });
  } catch (err) {
    dispatch({ type: PROFILE_ERROR });
  }
};

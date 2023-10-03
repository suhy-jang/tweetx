import client from '../utils/apolloClient';
import { setAlert } from './alert';
import {
  PROFILE_LOADING,
  GET_PROFILE,
  GET_PROFILES,
  PROFILE_ERROR,
} from './types';
import { queryUser, queryUsers } from './operations';

// Get Profile User
export const getProfile = (id) => async (dispatch) => {
  dispatch({ type: PROFILE_LOADING });
  const variables = { id };

  try {
    const res = await client.query({
      query: queryUser,
      variables,
      fetchPolicy: 'no-cache',
    });

    const { data, errors } = res;

    if (errors) {
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
      id: { not: id },
      followers: {
        none: {
          follower: {
            id,
          },
        },
      },
    },
  };

  dispatch({ type: PROFILE_LOADING });

  try {
    const res = await client.query({
      query: queryUsers,
      variables,
      fetchPolicy: 'no-cache',
    });

    const { data, errors } = res;

    if (errors) {
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

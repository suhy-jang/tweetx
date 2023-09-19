import client from '../utils/apolloClient';
import { setAlert } from './alert';
import {
  FOLLOW,
  UNFOLLOW,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  GET_USER_FOLLOWINGS,
  FOLLOW_LOADING,
} from './types';
import {
  queryFollowers,
  queryFollowings,
  mutateFollow,
  mutateUnfollow,
} from './operations';

export const follow = (id, callback) => async (dispatch) => {
  const variables = { id: id };

  try {
    const res = await client.mutate({ mutation: mutateFollow, variables });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    callback?.();

    dispatch({
      type: FOLLOW,
      payload: data.follow,
    });
  } catch (err) {
    dispatch(setAlert('Failed follow', 'danger'));
  }
};

export const unfollow = (id, callback) => async (dispatch) => {
  const variables = { id };

  try {
    const res = await client.mutate({ mutation: mutateUnfollow, variables });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    callback?.();

    dispatch({
      type: UNFOLLOW,
      payload: data.unfollow,
    });
  } catch (err) {
    dispatch(setAlert('Failed unfollow', 'danger'));
  }
};

export const getFollowers = (id) => async (dispatch) => {
  dispatch({ type: FOLLOW_LOADING });

  const variables = id ? { where: { id } } : {};

  try {
    const res = await client.query({
      query: queryFollowers,
      variables,
      fetchPolicy: 'no-cache',
    });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({
      type: GET_FOLLOWERS,
      payload: data.followers,
    });
  } catch (err) {
    dispatch(setAlert('Failed get followers', 'danger'));
  }
};

export const getFollowings = (id) => async (dispatch) => {
  dispatch({ type: FOLLOW_LOADING });

  const variables = id ? { where: { id } } : {};

  try {
    const res = await client.query({
      query: queryFollowings,
      variables,
      fetchPolicy: 'no-cache',
    });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({
      type: GET_FOLLOWINGS,
      payload: data.followings,
    });
  } catch (err) {
    dispatch(setAlert('Failed get followings', 'danger'));
  }
};

export const getUserFollowings = () => async (dispatch) => {
  dispatch({ type: FOLLOW_LOADING });

  try {
    const res = await client.query({
      query: queryFollowings,
      fetchPolicy: 'no-cache',
    });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
    }

    dispatch({
      type: GET_USER_FOLLOWINGS,
      payload: data.followings,
    });
  } catch (err) {
    dispatch(setAlert('Failed get followings', 'danger'));
  }
};

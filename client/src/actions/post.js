import client from '../utils/apolloClient';
import { setAlert } from './alert';
import {
  POST_LOADING,
  GET_MY_FEED,
  CREATE_POST,
  DELETE_POST,
  POST_ERROR,
} from './types';
import { queryMyFeed, mutateCreatePost, mutateDeletePost } from './operations';

export const getMyFeed = (update) => async (dispatch) => {
  dispatch({ type: POST_LOADING });

  try {
    const res = await client.query({
      query: queryMyFeed,
      fetchPolicy: update ? 'no-cache' : undefined,
    });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: POST_ERROR, payload: errors });
    }

    dispatch({
      type: GET_MY_FEED,
      payload: data.myFeed,
    });
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const createPost = (content, callback) => async (dispatch) => {
  dispatch({ type: POST_LOADING });

  const variables = {
    data: {
      content,
    },
  };

  try {
    const res = await client.mutate({ mutation: mutateCreatePost, variables });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: POST_ERROR, payload: errors });
    }

    dispatch({
      type: CREATE_POST,
      payload: data.createPost,
    });

    callback();
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

export const deletePost = (id, callback) => async (dispatch) => {
  const variables = {
    id,
  };

  try {
    const res = await client.mutate({ mutation: mutateDeletePost, variables });

    const { data, errors } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: POST_ERROR, payload: errors });
    }

    dispatch({
      type: DELETE_POST,
      payload: data.deletePost,
    });

    callback();
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

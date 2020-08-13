import axios from 'axios';
import { setAlert } from './alert';
import { POST_LOADING, GET_MY_FEED, CREATE_POST, POST_ERROR } from './types';
import { gqlMyFeed, gqlCreatePost } from './operations';
import { setAuthToken, setBaseUrl } from '../utils/axiosDefaults';

export const getMyFeed = () => async (dispatch) => {
  setBaseUrl();
  dispatch({ type: POST_LOADING });

  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.post('/graphql', { query: gqlMyFeed });

    const {
      data: { data, errors },
    } = res;

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

export const createPost = (content, history) => async (dispatch) => {
  dispatch({ type: POST_LOADING });

  const variables = {
    data: {
      content,
    },
  };

  try {
    const res = await axios.post('/graphql', {
      query: gqlCreatePost,
      variables,
    });

    const {
      data: { data, errors },
    } = res;

    if (!data) {
      errors.forEach((err) => dispatch(setAlert(err.message, 'danger')));
      return dispatch({ type: POST_ERROR, payload: errors });
    }

    dispatch({
      type: CREATE_POST,
      payload: data.createPost,
    });

    history.push('/');
  } catch (err) {
    dispatch({ type: POST_ERROR, payload: err });
  }
};

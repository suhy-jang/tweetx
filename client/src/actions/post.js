import axios from 'axios';
import { setAlert } from './alert';
import { POST_LOADING, GET_MY_FEED, POST_ERROR } from './types';
import { gqlMyFeed } from './operations';
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

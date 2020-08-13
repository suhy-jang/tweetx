import {
  POST_LOADING,
  GET_MY_FEED,
  CREATE_POST,
  POST_ERROR,
} from '../actions/types';

const initialState = {
  myFeed: [],
  posts: [],
  post: {},
  loading: false,
  error: {},
};

export default (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case POST_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_MY_FEED:
      return {
        ...state,
        myFeed: payload,
        loading: false,
      };
    case CREATE_POST:
      return {
        post: payload,
        myFeed: [payload, ...state.myFeed],
        ...state,
        loading: false,
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false,
      };
    default:
      return state;
  }
};

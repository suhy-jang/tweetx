import {
  POST_LOADING,
  GET_MY_FEED,
  CREATE_POST,
  DELETE_POST,
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
        ...state,
        post: payload,
        myFeed: [payload, ...state.myFeed],
        loading: false,
      };
    case DELETE_POST:
      return {
        ...state,
        post: null,
        myFeed: state.myFeed.filter((f) => f.id !== payload.id),
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

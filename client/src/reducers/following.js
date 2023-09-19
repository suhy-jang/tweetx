import {
  FOLLOW,
  UNFOLLOW,
  GET_FOLLOWERS,
  GET_FOLLOWINGS,
  FOLLOW_LOADING,
  GET_USER_FOLLOWINGS,
} from '../actions/types';

const initialState = {
  followers: [],
  followings: [],
  userFollowings: [],
};

const Following = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case FOLLOW_LOADING:
      return {
        ...state,
        loading: true,
      };
    case FOLLOW:
    case UNFOLLOW:
      return {
        ...state,
        loading: false,
      };
    case GET_FOLLOWERS:
      return {
        ...state,
        followers: payload,
        loading: false,
      };
    case GET_FOLLOWINGS:
      return {
        ...state,
        followings: payload,
        loading: false,
      };
    case GET_USER_FOLLOWINGS:
      return {
        ...state,
        userFollowings: payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default Following;

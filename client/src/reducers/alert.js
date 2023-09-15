import { SET_ALERT, REMOVE_ALERT } from '../actions/types';

const initialState = [];

const Alert = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case SET_ALERT:
      return [...state, payload];
    case REMOVE_ALERT:
      return state.filter((data) => data.id !== payload);
    default:
      return state;
  }
};

export default Alert;

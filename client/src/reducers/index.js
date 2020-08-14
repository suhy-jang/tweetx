import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import profile from './profile';
import { UNREGISTER, LOGOUT } from '../actions/types';

const rootReducer = combineReducers({
  alert,
  auth,
  post,
  profile,
});

export default (state, action) =>
  rootReducer(
    action.type === LOGOUT || action.type === UNREGISTER ? undefined : state,
    action,
  );

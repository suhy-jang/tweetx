import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import post from './post';
import profile from './profile';
import following from './following';
import { UNREGISTER, LOGOUT } from '../actions/types';

const rootReducer = combineReducers({
  alert,
  auth,
  post,
  profile,
  following,
});

const Reducer = (state, action) =>
  rootReducer(
    action.type === LOGOUT || action.type === UNREGISTER ? undefined : state,
    action,
  );

export default Reducer;

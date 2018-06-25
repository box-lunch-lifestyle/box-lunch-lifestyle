import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import entries from './entryReducer';
import positiveMessages from './positiveReducer';

const store = combineReducers({
  user,
  login,
  entries,
  positiveMessages,
});

export default store;

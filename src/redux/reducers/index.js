import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import entries from './entryReducer';
import comments from './commentReducer';

const store = combineReducers({
  user,
  login,
  entries,
  comments,
});

export default store;

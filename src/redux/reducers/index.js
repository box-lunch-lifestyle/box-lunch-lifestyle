import { combineReducers } from 'redux';
import user from './userReducer';
import login from './loginReducer';
import entries from './entryReducer';
import comments from './commentReducer';
import timer from './timerReducer';

const store = combineReducers({
  user,
  login,
  entries,
  comments,
  timer,
});

export default store;

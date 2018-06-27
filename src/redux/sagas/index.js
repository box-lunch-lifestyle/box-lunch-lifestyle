import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import entrySaga from './entrySaga';
import commentSaga from './commentSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    entrySaga(),
    commentSaga(),
    // watchIncrementAsync()
  ]);
}

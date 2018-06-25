import { all } from 'redux-saga/effects';
import userSaga from './userSaga';
import loginSaga from './loginSaga';
import entrySaga from './entrySaga';
import positiveMessageSaga from './positiveMessageSaga';


export default function* rootSaga() {
  yield all([
    userSaga(),
    loginSaga(),
    entrySaga(),
    positiveMessageSaga(),
    // watchIncrementAsync()
  ]);
}

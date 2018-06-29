import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchAllComments(action) {
  try {
    yield put({ type: "REQUEST_START_COMMENT_REDUCER" })
    const comments = yield call(
      axios.get('/api/comment/getComments')
        .then(response => response.data)
        .catch(error => { throw error.response || error; })
    );
    yield put({
      type: "SET_ALL_COMMENTS",
      payload: comments,
    })
    yield put({ type: "REQUEST_DONE_COMMENT_REDUCER" })
  } catch (error) {
    yield put({ type: "REQUEST_DONE_COMMENT_REDUCER" })
  }
}

function* fetchPostComment(action) {
  try {
    yield call(axios.post('/api/comment/postComment', action.payload)
      .then(response => response)
      .catch(error => { throw error.response || error; })
    )
    yield put({
      type: 'FETCH_ALL_COMMENTS',
    });
  } catch (error) {

  }
}

function* fetchPutComment(action) {
  try {
    yield call(
      axios.put(`/api/comment/putComment/${action.id}`, action.payload)
        .then(response => response)
        .catch(error => { throw error.response || error; })
    );
    yield put({ type: "FETCH_ALL_COMMENTS" })
  } catch (error) {

  }
};

function* fetchDeleteComment(action) {
  try {
    yield call(
      axios.delete(`/api/comment/deleteComment/${action.id}`)
        .then(response => response.data)
        .catch(error => { throw error.response || error; })
    );
    yield put({ type: "FETCH_ALL_COMMENTS" })
  } catch (error) {

  }
}

function* commentSaga() {
  yield takeEvery("FETCH_ALL_COMMENTS", fetchAllComments);
  yield takeEvery("FETCH_POST_COMMENT", fetchPostComment);
  yield takeEvery("FETCH_PUT_COMMENT", fetchPutComment);
  yield takeEvery("FETCH_DELETE_COMMENT", fetchDeleteComment);
};

export default commentSaga;
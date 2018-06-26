import { put, takeEvery, call } from 'redux-saga/effects';
import axios from 'axios';

function* fetchPostEntry(action) {
  try {
    yield put({ type: "REQUEST_START_ENTRY_REDUCER" });
    const entryId = yield call(
      axios.post('/api/entry', action.payload)
        .then(response => response.data[0].id)
        .catch(error => { throw error.response || error; })
    );
    yield put({
      type: "SET_CURRENT_ENTRY",
      payload: entryId,
    });
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  } catch (error) {
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  }
}

function* fetchAllEntries(action) {
  try {
    yield put({ type: "REQUEST_START_ENTRY_REDUCER" });
    const entries = yield call(
      axios.get('/api/entry/')
        .then(response => response.data)
        .catch(error => { throw error.response || error; })
    );
    yield put({
      type: "SET_ALL_ENTRIES",
      payload: entries,
    });
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  } catch (error) {
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  }
}

function* fetchAdminPageEntries(action) {
  try {
    yield put({ type: "REQUEST_START_ENTRY_REDUCER" });
    const entries = yield call(
      axios.get('/api/entry/admin')
        .then(response => response.data)
        .catch(error => { throw error.response || error; })
    );
    yield put({
      type: "SET_ADMIN_PAGE_ENTRIES",
      payload: entries,
    });
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  } catch (error) {
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  }
}

function* fetchEditEntry(action) {
  try {
    yield put({ type: "REQUEST_START_ENTRY_REDUCER" });
    yield call(
      axios.put(`/api/entry/${action.id}`, action.payload)
        .then(response => response)
        .catch(error => { throw error.response || error; })
    ); 
    yield call({ type: "FETCH_ALL_ENTRIES" });
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  } catch (error) {
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  }
}

function* entrySaga() {
  yield takeEvery("POST_NEW_ENTRY", fetchPostEntry);
  yield takeEvery("FETCH_ALL_ENTRIES", fetchAllEntries);
  yield takeEvery("FETCH_ADMIN_PAGE_ENTRIES", fetchAdminPageEntries);
  yield takeEvery("FETCH_EDIT_ENTRY", fetchEditEntry);
};

export default entrySaga;
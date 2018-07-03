import { put, takeEvery } from 'redux-saga/effects';
import { callPostEntry, callAdminPageEntries, callAllEntries, callEditEntry } from '../requests/entryRequests';

function* fetchPostEntry(action) {
  try {
    yield put({ type: "REQUEST_START_ENTRY_REDUCER" });
    const entryId = yield callPostEntry(action.payload);
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
    const entries = yield callAllEntries();
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
    const entries = yield callAdminPageEntries();
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
    yield callEditEntry(action);
    yield put({ type: "FETCH_ALL_ENTRIES" });
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  } catch (error) {
    yield put({ type: "REQUEST_DONE_ENTRY_REDUCER" });
  }
}

function* entrySaga() {
  yield takeEvery("POST_NEW_ENTRY", fetchPostEntry);
  yield takeEvery("FETCH_ALL_ENTRIES", fetchAllEntries);
  yield takeEvery("FETCH_ADMIN_PAGE_ENTRIES", fetchAdminPageEntries);
  yield takeEvery("FETCH_EDIT_ENTRY", fetchEditEntry );
};

export default entrySaga;
import {combineReducers} from 'redux';

// tracks the list of all comments made by logged in user
const allComments = (state = [], action) => {
  switch (action.type) {
    case "SET_ALL_COMMENTS":
      return action.payload;
    case "CLEAR_ALL_COMMENTS":
      return [];
    default:
      return state;
  }
}

// tracks if the reducer is currently being modified
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "REQUEST_START_COMMENT_REDUCER":
      return true;
    case "REQUEST_DONE_COMMENT_REDUCER":
      return false;
    default:
      return state;
  }
};

export default combineReducers ({
  allComments,
  isLoading,
});
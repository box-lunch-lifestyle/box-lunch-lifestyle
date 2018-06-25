import {combineReducers} from 'react-redux';

// tracks if the reducer is currently being modified
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "REQUEST_START_POSITIVE_MESSAGE_REDUCER":
      return true;
    case "REQUEST_DONE_POSITIVE_MESSAGE_REDUCER":
      return false;
    default:
      return state;
  }
};

export default combineReducers ({
  isLoading,
});
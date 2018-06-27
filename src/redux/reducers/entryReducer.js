import {combineReducers} from 'redux';

// tracks what the current entry being used is
const currentEntryId = (state = null, action) => {
  switch(action.type) {
    case "SET_CURRENT_ENTRY":
      return action.payload;
    case "UNSET_CURRENT_ENTRY":
      return null;
    default:
      return state;
  }
}

// all entries to display on journal page
const allEntries = (state = [], action) => {
  switch(action.type) {
    case "SET_ALL_ENTRIES":
      return action.payload;
    case "UNSET_ALL_ENTRIES":
      return [];
    default:
      return state;
  }
}

// all entries to display on admin page for tracking purposes
// (ex. # of entries with comments, # of incomplete entries, etc);
const adminPageEntries = (state = [], action) => {
  switch(action.type) {
    case "SET_ADMIN_PAGE_ENTRIES":
      return action.payload;
    case "UNSET_ADMIN_PAGE_ENTRIES":
      return [];
    default:
      return state;
  }
}

// tracks if the reducer is currently being modified
const isLoading = (state = false, action) => {
  switch (action.type) {
    case "REQUEST_START_ENTRY_REDUCER":
      return true;
    case "REQUEST_DONE_ENTRY_REDUCER":
      return false;
    default:
      return state;
  }
};

export default combineReducers ({
  isLoading,
  currentEntryId,
  allEntries,
  adminPageEntries,
});
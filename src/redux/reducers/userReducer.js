import { combineReducers } from 'redux';
import { USER_ACTIONS } from '../actions/userActions';

const userName = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.username || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
};

const name = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.name || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}

const isAdmin = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.is_admin || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}

const getEmails = (state = null, action) => {
  switch (action.type) {
    case USER_ACTIONS.SET_USER:
      return action.user.get_emails || state;
    case USER_ACTIONS.UNSET_USER:
      return null;
    default:
      return state;
  }
}

//const userId

const isLoading = (state = false, action) => {
  switch (action.type) {
    case USER_ACTIONS.REQUEST_START:
      return true;
    case USER_ACTIONS.REQUEST_DONE:
      return false;
    default:
      return state;
  }
};

export default combineReducers({
  userName,
  isLoading,
  isAdmin,
  getEmails,
  name,
  //userId
});

import { combineReducers } from 'redux';

const currentRound = (state = '', action) => {
  switch (action.type) {
    case "SET_CURRENT_ROUND":
      return action.payload;
    case "CLEAR_TIMER_REDUCER":
      return '';
    default:
      return state;
  }
}

const isPlaying = (state = false, action) => {
  switch (action.type) {
    case "SET_PLAYING":
      return true;
    case "SET_PAUSED":
      return false;
    case "CLEAR_TIMER_REDUCER":
      return false;
    default:
      return state;
  }
}

const lifeDone = (state = false, action) => {
  switch (action.type) {
    case "SET_LIFE_COMPLETED":
      return true;
    case "SET_LIFE_INCOMPLETE":
      return false;
    case "CLEAR_TIMER_REDUCER":
      return false;
    default:
      return state;
  }
}

const foodDone = (state = false, action) => {
  switch (action.type) {
    case "SET_FOOD_COMPLETED":
      return true;
    case "SET_FOOD_INCOMPLETE":
      return false;
    case "CLEAR_TIMER_REDUCER":
      return false;
    default:
      return state;
  }
}

const modalOpen = (state = false, action) => {
  switch (action.type) {
    case "SET_MODAL_OPEN":
      return true;
    case "SET_MODAL_CLOSED":
      return false;
    case "CLEAR_TIMER_REDUCER":
      return false;
    default:
      return state;
  }
}

export default combineReducers ({
  currentRound,
  isPlaying,
  lifeDone,
  foodDone,
  modalOpen,
})
import { SET_ALARM, REMOVE_ALARM } from "../actions/types";

const initialState = [];

function alarmsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALARM:
      return [payload, ...state];
    case REMOVE_ALARM:
      return state.filter((alarm) => alarm.id !== payload);
    default:
      return state;
  }
}

export default alarmsReducer;

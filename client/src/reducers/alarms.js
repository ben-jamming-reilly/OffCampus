import { SET_ALARM, REMOVE_ALARM } from "../actions/types";

const initialState = [];

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case SET_ALARM:
      return [...state, payload];
    case REMOVE_ALARM:
      return state.filter((alarm) => alarm.id !== payload);
    default:
      return state;
  }
}

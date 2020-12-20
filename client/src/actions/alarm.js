import { v4 as uuidv4 } from "uuid";
import { SET_ALARM, REMOVE_ALARM } from "./types";

export const setAlarm = (msg, type = "danger") => (dispatch) => {
  const id = uuidv4();

  dispatch({
    type: SET_ALARM,
    payload: { msg, type, id },
  });

  setTimeout(() => dispatch({ type: REMOVE_ALARM, payload: id }), 10000);
};

export const removeAlarm = (id) => (dispatch) => {
  dispatch({ type: REMOVE_ALARM, payload: id });
};

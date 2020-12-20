import axios from "axios";
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
} from "./types";
import setAuthToken from "../utils/setAuthToken";
import { setAlarm } from "./alarm";

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    let res = await axios.get("/api/auth/");

    console.log(res.data);
    dispatch({
      type: USER_LOADED,
      payload: res.data,
    });
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const signup = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify(userData);
  console.log(userData);
  try {
    const res = await axios.post("/api/auth/register", body, config);

    dispatch({
      type: SIGNUP_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        console.error(errors);
        errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
      }
    }
    dispatch({
      type: SIGNUP_FAIL,
    });
  }
};

export const login = (userData) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(userData);
  console.log(userData);
  try {
    const res = await axios.post("/api/auth/login", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data,
    });

    dispatch(loadUser());
  } catch (err) {
    const errors = err.response.data.errors;

    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }

    dispatch({
      type: LOGIN_FAIL,
    });
  }
};

export const logout = () => async (dispatch) => {
  dispatch({
    type: LOGIN_FAIL,
  });
};

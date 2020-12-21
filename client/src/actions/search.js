import axios from "axios";
import { GET_HOUSES, GET_HOUSE, LOADING_HOUSES } from "./types";

import { setAlarm } from "./alarm";

export const searchHouses = (choice) => async (dispatch) => {
  dispatch({ type: LOADING_HOUSES });
  try {
    let res = undefined;

    if (choice === "rent") {
      res = await axios.get("/api/properties/rent");
    } else if (choice === "reviews") {
      res = await axios.get("/api/properties/reviews");
    } else if (choice === "capacity") {
      res = await axios.get("/api/properties/capacity");
    } else {
      res = await axios.get("/api/properties");
    }

    dispatch({
      type: GET_HOUSES,
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

export const getHouse = (zip, city, street) => async (dispatch) => {
  dispatch({ type: LOADING_HOUSES });
  try {
    let res = await axios.get(`/api/properties/${zip}/${city}/${street}`);

    dispatch({
      type: GET_HOUSE,
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

import axios from "axios";
import {
  GET_HOUSES,
  GET_MORE_HOUSES,
  GET_HOUSE,
  LOADING_HOUSES,
} from "./types";

import { setAlarm } from "./alarm";

export const searchHouses = (formData = null, page = 0) => async (dispatch) => {
  dispatch({ type: LOADING_HOUSES });
  try {
    let res = await axios.get(
      "/api/properties/search/" +
        `${formData.zip}/${formData.city}/${formData.street}/${page}`
    );

    if (page === 0) {
      dispatch({
        type: GET_HOUSES,
        payload: res.data.properties,
      });
    } else {
      dispatch({
        type: GET_MORE_HOUSES,
        payload: res.data,
      });
    }
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
    if (err.response) {
      const errors = err.response.data.errors;
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

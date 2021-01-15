import axios from "axios";
import { GET_HOUSE, GET_HOUSE_ERR, LOADING_HOUSES } from "./types";

import { setAlarm } from "./alarm";

export const newProperty = (formData, file, history) => async (dispatch) => {
  console.log("Hello from here");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const body = new FormData();
  body.append("image", file[0]);
  body.append("data", JSON.stringify(formData));

  try {
    let res = await axios.post("/api/properties", body, config);

    //history.push(`/property/${formData.address}`);
    //res.data.msg
    dispatch(setAlarm(res.data.msg, "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    dispatch(setAlarm("You must be logged in to post a property.", "danger"));
    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const newParcelProperty = (formData, property, history) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ formData, property });

  try {
    const res = await axios.post("/api/properties/parcel", body, config);

    history.push(
      `/property/${property.zip}/${property.city}/${property.street}`
    );
    dispatch(setAlarm(res.data.msg, "success"));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const getParcelProperty = (formData) => async (dispatch) => {
  dispatch({ type: LOADING_HOUSES });
  try {
    const res = await axios.get(
      `/api/properties/parcel/${formData.zip}/${formData.city}/${formData.street}`
    );

    dispatch({ type: GET_HOUSE, payload: res.data });
  } catch (err) {
    dispatch({ type: GET_HOUSE_ERR });
    if (err.response) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

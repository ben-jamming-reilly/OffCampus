import axios from "axios";
import {
  GET_SAVED_PROPERTIES,
  SAVE_PROPERTY,
  REMOVE_SAVED_PROPERTY,
} from "./types";
import { setAlarm } from "./alarm";

export const newProperty = (formData, file, history) => async (dispatch) => {
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

export const getSavedProperties = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/properties/saved");

    dispatch({
      type: GET_SAVED_PROPERTIES,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const saveProperty = () => async (dispatch) => {
  try {
    const res = await axios.post("/api/properties/saved");

    dispatch({
      type: SAVE_PROPERTY,
      payload: res.data,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const deleteSavedProperty = (property) => async (dispatch) => {
  try {
    await axios.delete(
      `/api/properties/saved/${property.zip}/${property.city}/${property.zip}`
    );

    dispatch({
      type: REMOVE_SAVED_PROPERTY,
      payload: property,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

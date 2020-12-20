import axios from "axios";
import {
  GET_REVIEWS,
  LIKE_REVIEW,
  UNLIKE_REVIEW,
  LOADING_REVIEWS,
} from "./types";

import { setAlarm } from "./alarm";

export const getReviews = (address) => async (dispatch) => {
  dispatch({ type: LOADING_REVIEWS });
  try {
    let res = await axios.get(`/api/reviews/${address}`);

    dispatch({
      type: GET_REVIEWS,
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

export const likeReview = (review, address) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ review: review, address: address });

  try {
    await axios.post(`/api/reviews/like`, body, config);

    // assume success
    review.numLikes++;

    dispatch({
      type: LIKE_REVIEW,
      payload: review,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        console.error(errors);
        errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
      }
    }
  }
};

export const unlikeReview = (review, address) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ review: review, address: address });
  try {
    await axios.post(`/api/reviews/unlike`, body, config);
    review.numLikes--;

    dispatch({
      type: UNLIKE_REVIEW,
      payload: review,
    });
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      if (errors) {
        console.error(errors);
        errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
      }
    }
  }
};

export const addNewReview = (formData, file, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  const body = new FormData();
  body.append("image", file[0]);
  body.append("data", JSON.stringify(formData));

  try {
    await axios.post("/api/properties", body, config);

    // On success
    history.push(`/property/${formData.address}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const addReview = (formData, address, history) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  try {
    await axios.post(`/api/reviews/${address}`, body, config);

    // On success
    history.push(`/property/${formData.address}`);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

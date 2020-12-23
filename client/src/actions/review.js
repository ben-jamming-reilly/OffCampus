import axios from "axios";
import {
  GET_REVIEWS,
  LIKE_REVIEW,
  ADD_REVIEW,
  UNLIKE_REVIEW,
  LOADING_REVIEWS,
} from "./types";

import { setAlarm } from "./alarm";

export const getReviews = (zip, city, street) => async (dispatch) => {
  dispatch({ type: LOADING_REVIEWS });
  try {
    let res = await axios.get(`/api/reviews/${zip}/${city}/${street}`);

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

export const addReview = (formData, user, property) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify(formData);
  try {
    let res = await axios.post(
      `/api/reviews/${property.zip}/${property.city}/${property.street}`,
      body,
      config
    );

    const review = {
      user_name: user.user_name,
      user_id: user.id,
      review: formData.review,
      rating: formData.rating,
      likes: 0,
    };

    console.log(review);

    dispatch({
      type: ADD_REVIEW,
      payload: review,
    });

    console.log(res.data);
    dispatch(setAlarm("Review Added", "success"));
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

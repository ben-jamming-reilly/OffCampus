import axios from "axios";
import {
  GET_REVIEWS,
  LIKE_REVIEW,
  ADD_REVIEW,
  ADD_REVIEW_CAPTCHA,
  UNLIKE_REVIEW,
  LOADING_REVIEWS,
  GET_REVIEW,
} from "./types";

import { setAlarm } from "./alarm";

export const getReviews = (zip, city, street, user = null) => async (
  dispatch
) => {
  dispatch({ type: LOADING_REVIEWS });
  try {
    if (!user) {
      let res = await axios.get(`/api/reviews/${zip}/${city}/${street}`);

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });

      if (user) {
        dispatch({
          type: GET_REVIEW,
          payload: res.data.filter((r) => r.user_id === user.id)[0],
        });
      }
    } else {
      let res = await axios.get(
        `/api/reviews/${zip}/${city}/${street}/${user.id}`
      );

      dispatch({
        type: GET_REVIEWS,
        payload: res.data,
      });

      if (user) {
        dispatch({
          type: GET_REVIEW,
          payload: res.data.filter((r) => r.user_id === user.id)[0],
        });
      }
    }
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

export const likeReview = (review, property) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  const body = JSON.stringify({ review: review, property: property });

  try {
    let updateReview = review;
    updateReview.likes++;
    updateReview.isLiked = true;

    dispatch({
      type: LIKE_REVIEW,
      payload: updateReview,
    });

    await axios.post(`/api/reviews/like`, body, config);
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

export const unlikeReview = (review, property) => async (dispatch) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = JSON.stringify({ review: review, property: property });
  try {
    let updateReview = review;
    updateReview.likes--;
    updateReview.isLiked = false;

    dispatch({
      type: UNLIKE_REVIEW,
      payload: updateReview,
    });

    await axios.post(`/api/reviews/unlike`, body, config);
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

export const addReviewAuth = (formData, property, user) => async (dispatch) => {
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
      body: formData.body,
      rating: formData.rating,
      likes: 0,
    };

    dispatch({
      type: ADD_REVIEW,
      payload: review,
    });

    dispatch(setAlarm(res.data.msg, "success"));
    return true;
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
    return false;
  }
};

export const addReviewCaptcha = (formData, property, captcha) => async (
  dispatch
) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: captcha,
    },
  };
  const body = JSON.stringify({ formData });
  try {
    const res = await axios.post(
      `/api/reviews/captcha/${property.zip}/${property.city}/${property.street}`,
      body,
      config
    );

    const review = {
      body: formData.body,
      rating: formData.rating,
      likes: 0,
    };
    dispatch({
      type: LOADING_REVIEWS,
    });
    dispatch({
      type: ADD_REVIEW_CAPTCHA,
      payload: review,
    });

    dispatch(setAlarm(res.data.msg, "success"));
    return true;
  } catch (err) {
    if (err.response) {
      const errors = err.response.data.errors;
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
    return false;
  }
};

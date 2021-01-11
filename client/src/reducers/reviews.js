import {
  GET_REVIEWS,
  GET_REVIEW,
  LIKE_REVIEW,
  UNLIKE_REVIEW,
  ADD_REVIEW,
  ADD_REVIEW_CAPTCHA,
  UPDATE_REVIEW,
  LOADING_REVIEWS,
} from "../actions/types";

const initialState = {
  review: null,
  reviews: [],
  loading: true,
};

function reviewsReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };
    case GET_REVIEW:
      return {
        ...state,
        review: payload,
      };
    case ADD_REVIEW_CAPTCHA:
      return {
        ...state,
        loading: false,
        reviews: [payload].concat(
          state.reviews.filter((r) => r.review_id !== payload.review_id)
        ),
      };
    case ADD_REVIEW:
      return {
        ...state,
        review: payload,
        reviews: [payload].concat(
          state.reviews.filter((r) => r.review_id !== payload.review_id)
        ),
      };
    case UPDATE_REVIEW:
      return {
        reviews: [payload],
        review: payload,
        loading: false,
      };
    case LIKE_REVIEW:
    case UNLIKE_REVIEW:
      return {
        ...state,
        reviews: state.reviews.map((r) =>
          payload.review_id === r.review_id ? payload : r
        ),

        loading: false,
      };
    case LOADING_REVIEWS:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

export default reviewsReducer;

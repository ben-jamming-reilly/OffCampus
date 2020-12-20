import {
  GET_REVIEWS,
  LIKE_REVIEW,
  UNLIKE_REVIEW,
  LOADING_REVIEWS,
} from "../actions/types";

const initialState = {
  reviews: [],
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_REVIEWS:
      return {
        ...state,
        reviews: payload,
        loading: false,
      };
    case LIKE_REVIEW:
      return {
        ...state,
        reviews: [
          state.reviews.reviews.map((r) =>
            payload.user_id == r.user_id
              ? { ...r, num_likes: r.num_likes++ }
              : r
          ),
        ],
        loading: false,
      };
    case UNLIKE_REVIEW:
      return {
        ...state,
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

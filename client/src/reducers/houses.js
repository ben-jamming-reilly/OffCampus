import {
  GET_HOUSES,
  GET_HOUSE,
  LOADING_HOUSES,
  GET_HOUSE_ERR,
  GET_HOUSES_ERR,
} from "../actions/types";

const initialState = {
  houses: [],
  house: null,
  loading: true,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: payload,
        loading: false,
      };
    case GET_HOUSE:
      return {
        ...state,
        house: payload,
        loading: false,
      };
    case GET_HOUSES_ERR:
    case GET_HOUSE_ERR:
      return {
        ...state,
        loading: false,
      };
    case LOADING_HOUSES:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
}

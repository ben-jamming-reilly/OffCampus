import {
  GET_HOUSES,
  GET_MORE_HOUSES,
  GET_HOUSE,
  LOADING_HOUSES,
  GET_HOUSE_ERR,
  GET_HOUSES_ERR,
} from "../actions/types";

const initialState = {
  houses: [],
  house: null,
  loading: true,
  endOfQuery: false,
  page: 0,
};

function houseReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_HOUSES:
      return {
        ...state,
        houses: payload.properties,
        loading: false,
        endOfQuery: payload.endOfQuery,
        page: 1,
      };
    case GET_MORE_HOUSES:
      return {
        ...state,
        houses: state.houses.concat(payload.properties),
        loading: false,
        endOfQuery: payload.endOfQuery,
        page: state.page + 1,
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
        houses: [],
        house: null,
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

export default houseReducer;

import {
  GET_SAVED_PROPERTIES,
  SAVE_PROPERTY,
  REMOVE_SAVED_PROPERTY,
} from "../actions/types";

const initialState = {
  properties: [],
  loading: true,
};

function savedReducer(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_SAVED_PROPERTIES:
      return {
        properties: payload,
        loading: false,
      };
    case SAVE_PROPERTY:
      return {
        ...state,
        properties: state.properties.concat(payload),
      };
    case REMOVE_SAVED_PROPERTY:
      return {
        ...state,
        properties: state.properties.filter(
          (p) =>
            p.street !== payload.street &&
            p.city !== payload.city &&
            p.zip !== payload.zip
        ),
      };
    default:
      return state;
  }
}

export default savedReducer;

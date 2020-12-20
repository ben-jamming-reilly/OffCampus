import { combineReducers } from "redux";
import auth from "./auth";
import houses from "./houses";
import reviews from "./reviews";
import alarms from "./alarms";

export default combineReducers({
  auth,
  houses,
  reviews,
  alarms,
});

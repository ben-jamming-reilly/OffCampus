import { combineReducers } from "redux";
import auth from "./auth";
import houses from "./houses";
import reviews from "./reviews";
import alarms from "./alarms";
import saved from "./saved";

export default combineReducers({
  auth,
  houses,
  saved,
  reviews,
  alarms,
});

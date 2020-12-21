import axios from "axios";

import { setAlarm } from "./alarm";

export const newProperty = (formData, file, history) => async (dispatch) => {
  console.log("Hello from here");
  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const body = new FormData();
  body.append("image", file[0]);
  body.append("data", JSON.stringify(formData));

  try {
    //let res = await axios.post("/api/properties", body, config);

    history.push(`/property/${formData.address}`);
    //res.data.msg
    dispatch(setAlarm("Hi", "success"));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      console.error(errors);
      errors.forEach((error) => dispatch(setAlarm(error.msg, error.type)));
    }
  }
};

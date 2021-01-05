const axios = require("axios");

module.exports = async function (req, res, next) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const body = {
    secret: "",
    response: "",
  };

  try {
    let captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      body,
      config
    );

    console.log(captchaRes);
    next();
  } catch (err) {
    return res.status(401).json({ msg: "CAPTCHA not verified" });
  }
};

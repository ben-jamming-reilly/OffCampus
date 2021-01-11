const axios = require("axios");
const config = require("config");

module.exports = async function (req, res, next) {
  const clientToken = req.header("Authorization");
  const captchaSecret = config.get("captcha_secret_key");

  const configHTTP = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  try {
    // NOTE: The formated string is for the params. I think there is a better way
    // to do this with axios, but im not quite sure
    // This uses google api to validate the captcha
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify" +
        `?secret=${captchaSecret}&response=${clientToken}`,
      null,
      configHTTP
    );

    //console.log(captchaRes.data);

    if (!captchaRes.data.success)
      return res.status(401).json({ msg: "CAPTCHA not verified" });

    next();
  } catch (err) {
    return res.status(401).json({ msg: "CAPTCHA not verified" });
  }
};

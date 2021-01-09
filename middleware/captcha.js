const axios = require("axios");
const config = require("config");

module.exports = async function (req, res, next) {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const token = req.header("Authorization");

  const body = JSON.stringify({
    secret: config.get("captcha_secret_key"),
    response: token,
  });

  try {
    const captchaRes = await axios.post(
      "https://www.google.com/recaptcha/api/siteverify",
      body,
      config
    );

    console.log(captchaRes);

    if (!captchaRes.success)
      return res.status(401).json({ msg: "CAPTCHA not verified" });

    next();
  } catch (err) {
    return res.status(401).json({ msg: "CAPTCHA not verified" });
  }
};

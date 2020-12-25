const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const db = require("../../utils/db");
const axios = require("axios");

// This is just a test route, remove for production
router.get("/", async (req, res) => {
  try {
    let stuff = await axios.get(
      "https://gismo.spokanecounty.org/arcgis/rest/services/SCOUT/PropertyLookup/MapServer/0/"
    );

    console.log(stuff);

    return res.status(200).json({ msg: "Okay!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

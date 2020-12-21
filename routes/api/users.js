const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

// This is just a test route, remove for production
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM User", []);

    console.log(rows);

    return res.status(200).json(rows);
  } catch (err) {
    //console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

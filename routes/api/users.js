const express = require("express");
const router = express.Router();
const config = require("config");
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

router.get("/", async (req, res) => {
  try {
    //console.log(db);
    const [rows, fields] = await db.query("SELECT * FROM User", []);

    //console.log(rows);

    return res.status(200).send(200);
  } catch (err) {
    //console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

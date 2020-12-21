const express = require("express");
const router = express.Router();
const fs = require("fs");

const db = require("../../utils/db");
const auth = require("../../middleware/auth");
const uploads = require("../../middleware/uploads");

// Add a property
router.post("/", [auth, uploads.single("image")], async (req, res) => {
  let form = JSON.parse(req.body.data);
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT * FROM Property WHERE street = ? AND city = ? AND zip = ?",
      [form.street, form.city, form.zip]
    );

    if (rows.length > 0) {
      return res
        .status(405)
        .json({ errors: [{ msg: "Property already exists." }] });
    }

    await db.query(
      "INSERT INTO Property " +
        "(street, city, zip, state, rent, capacity, file_name) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?); ",
      [
        form.street,
        form.city,
        form.zip,
        form.state,
        form.rent,
        form.capacity,
        req.file.filename,
      ]
    );

    return res.status(201).json({ msg: "Property Added!" });
  } catch (err) {
    console.error(err.message);

    // Remove property image from uploads/ dir
    fs.unlink(req.file.filename, (err) => {
      console.error(err);
    });

    return res.status(500).send("Server Error");
  }
});

router.get("/:zip/:city/:street", async (req, res) => {
  const { street, city, zip } = req.params;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT street, city, zip, state, rent, capacity, file_name " +
        "FROM Property WHERE street = ? AND city = ? AND zip = ?; ",
      [street, city, zip]
    );

    if (rows.length != 1)
      return res
        .status(400)
        .json({ errors: [{ msg: "Property doesn't exist" }] });

    return res.status(200).json(rows[0]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM Property; ", []);

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/rent", async (req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT street, city, zip, state, rent, capacity, file_name " +
        " FROM Property ORDER BY rent; ",
      []
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT P.street, P.city, P.zip, P.state, P.rent, P.capacity, P.file_name " +
        "FROM Property P JOIN Review R USING(street, city, zip) " +
        "GROUP BY (P.street, P.city, P.zip) " +
        "ORDER BY COUNT(*) ASC; ",
      []
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/capacity", async (req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT street, city, zip, state, rent, capacity, file_name FROM Property ORDER BY capacity; ",
      []
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

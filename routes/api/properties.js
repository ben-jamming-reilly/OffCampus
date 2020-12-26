const express = require("express");
const router = express.Router();
const fs = require("fs");

const db = require("../../utils/db");
const auth = require("../../middleware/auth");
const uploads = require("../../middleware/uploads");

// TEST
// GET all properties
router.get("/", async (req, res) => {
  try {
    const [rows, fields] = await db.query("SELECT * FROM Property; ", []);

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// gets a single property
router.get("/:zip/:city/:street", async (req, res) => {
  const { street, city, zip } = req.params;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT street, city, zip, state, type, next_lease_date, beds, baths, " +
        "area, rent, file_name, pic_link, verified " +
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

// Adds a default
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
        "(street, city, zip, state, type, next_lease_date, " +
        "beds, baths, area, rent, file_name, pic_link, verified) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?); ",
      [
        form.street,
        form.city,
        form.zip,
        form.state,
        form.type,
        form.next_lease_date,
        form.beds,
        form.baths,
        form.area,
        form.rent,
        req.file.filename,
        form.pic_link,
        form.verified,
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

router.post("/parcel", auth, async (req, res) => {
  try {
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// GET the ParcelData preview of property
router.get("/parcel/:zip/:city/:street", async (req, res) => {
  const { street, city, zip } = req.params;
  try {
    return res.status(200).json({});
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// Performs a search by address, for parcels
router.get("/parcel/search/:zip/:city/:street", async (req, res) => {
  const { street, city, zip } = req.params;

  try {
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// Performs a search by address
router.get("/search/:zip/:city/:street/:page", async (req, res) => {
  const { street, city, zip } = req.params;
  const page_requests = 10;

  try {
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

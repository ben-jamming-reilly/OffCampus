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
    const [rows, fields] = await db.query("SELECT * FROM Property LIMIT 10; ");

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

// Adds a property by default
router.post("/", [auth, uploads.single("image")], async (req, res) => {
  const form = JSON.parse(req.body.data);
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

// Adds a property with parcel info
router.post("/parcel", auth, async (req, res) => {
  const form = JSON.parse(req.body.data);

  try {
    // Retrieve data from parcel info
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT pid, SUM(beds) as beds, SUM(baths) as baths, 43560 * acreage as area " +
        "FROM ParcelData JOIN ParcelFloor USING(pid) " +
        "WHERE street = ? AND city = ? AND zip = ? " +
        "GROUP BY street, city, zip; ",
      [form.street, form.city, form.zip]
    );

    // Check to see if parcel data was found
    if (rows.length != 1) {
      return res.status(404).json({
        errors: [{ msg: "Parcel Data not found." }],
      });
    }

    const pic_link = `https://cp.spokanecounty.org/Assessor/ParcelImages/default.aspx?txtSelParcel=${rows[0].pid}`;
    // Adds property to database
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
        null,
        rows[0].beds,
        rows[0].baths,
        rows[0].area,
        form.rent,
        null,
        pic_link,
        true,
      ]
    );

    return res.status(201).json({ msg: "Property Added!" });
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// GET the ParcelData preview of property
router.get("/parcel/:zip/:city/:street", async (req, res) => {
  const { street, city, zip } = req.params;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT pid, SUM(beds) as beds, SUM(baths) as baths, 43560 * acreage as area " +
        "FROM ParcelData JOIN ParcelFloor USING(pid) " +
        "WHERE street = ? AND city = ? AND zip = ? " +
        "GROUP BY street, city, zip, pid; ",
      [street, city, zip]
    );

    // Check to see if parcel data was found
    if (rows.length != 1) {
      return res.status(404).json({
        errors: [{ msg: "Parcel Data not found." }],
      });
    }

    const pic_link = `https://cp.spokanecounty.org/Assessor/ParcelImages/default.aspx?txtSelParcel=${rows[0].pid}`;

    // Hard coded in WA for rn. It'll be pretty easy to convert
    // the zip to states.
    const property = {
      street: street,
      city: city,
      zip: zip,
      state: "WA",
      beds: rows[0].beds,
      baths: rows[0].baths,
      area: rows[0].area,
      pic_link: pic_link,
    };

    return res.status(200).json(property);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// Performs a search by address, for parcels
// This will be gotten rid of
router.get("/parcel/search/:zip/:city/:street/:page", async (req, res) => {
  const { street, city, zip, page } = req.params;
  const page_requests = 10;

  let curPage = 0;
  if (page) curPage = page;

  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT pid, SUM(beds) AS beds, SUM(baths) AS baths, ROUND(acreage * 43560, 0) AS area " +
        "FROM ParcelData JOIN ParcelFloor USING(pid) " +
        "WHERE SOUNDEX(street) = SOUNDEX(?) AND city = ? AND zip = ? " +
        "GROUP BY street, city, zip; ",
      [street, city, zip]
    );

    for (let i = 0; i < rows.length; i++) {
      rows[0].street = street;
      rows[0].city = city;
      rows[0].zip = zip;
      rows[0].state = "WA";
      rows[0].pic_link = `https://cp.spokanecounty.org/Assessor/ParcelImages/default.aspx?txtSelParcel=${rows[0].pid}`;
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

// Performs a search by address
router.get("/search/:zip/:city/:street/:page", async (req, res) => {
  const { street, city, zip, page } = req.params;
  const page_requests = 10;
  const page_offset = page_requests * page;

  try {
    const [rows, fields] = await db.query(
      "SELECT * " +
        "FROM Property " +
        "WHERE SOUNDEX(street) LIKE CONCAT('%', SUBSTRING(SOUNDEX(?), 2) AND city = ? AND zip = ? " +
        "ORDER BY ABS(CAST(SUBSTRING(street, 1, 4) AS SIGNED) - CAST(SUBSTRING(?, 1, 4) AS SIGNED))" +
        "LIMIT ?, ?; ",
      [street, city, zip, street, page_offset, page_requests]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

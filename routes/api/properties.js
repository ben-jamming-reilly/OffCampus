const express = require("express");
const router = express.Router();

const db = require("../../utils/db");
const auth = require("../../middleware/auth");
const uploads = require("../../middleware/uploads");

router.post("/", [auth, uploads.single("image")], async (req, res) => {
  let form = JSON.parse(req.body.data);
  try {
    await db.query(
      "INSERT INTO Property " +
        "(street, city, zip, state, rent, capacity, lease_date, file_name) " +
        "VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [
        form.street,
        form.city,
        form.zip,
        form.state,
        form.rent,
        form.capacity,
        form.lease_date,
        req.file.filename,
      ]
    );

    await db.query(
      "INSERT INTO Review (user_id, address, review) VALUES (?, ?, ?) ",
      [req.user.id, form.address, form.review]
    );

    return res.status(201).json({ success: true });
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
      "SELECT * FROM Property ORDER BY rent; ",
      []
    );

    let properties = [];

    rows.forEach((element) => {
      properties.push({
        address: element.address,
        rent: element.rent,
        lease_date: element.lease_date,
        capacity: element.capacity,
        landlord_id: element.landlord_id,
        file_name: element.file_name,
      });
    });

    return res.status(200).json(properties);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/reviews", async (req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT P.address, P.rent, P.lease_date, P.capacity, P.landlord_id, P.file_name " +
        "FROM Property P JOIN Review R USING(address) " +
        "GROUP BY P.address " +
        "ORDER BY COUNT(*); ",
      []
    );

    let properties = [];

    rows.forEach((element) => {
      properties.push({
        address: element.address,
        rent: element.rent,
        lease_date: element.lease_date,
        capacity: element.capacity,
        landlord_id: element.landlord_id,
        file_name: element.file_name,
      });
    });

    return res.status(200).json(properties);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/capacity", async (req, res) => {
  try {
    const [rows, fields] = await db.query(
      "SELECT * FROM Property ORDER BY capacity; ",
      []
    );

    let properties = [];

    rows.forEach((element) => {
      properties.push({
        address: element.address,
        rent: element.rent,
        lease_date: element.lease_date,
        capacity: element.capacity,
        landlord_id: element.landlord_id,
        file_name: element.file_name,
      });
    });

    return res.status(200).json(properties);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/:address", async (req, res) => {
  const address = req.params.address;
  try {
    const [rows, fields] = await db.query(
      "" + "SELECT * FROM Property WHERE address = ?",
      [address]
    );

    if (rows.length != 1)
      return res
        .status(400)
        .json({ errors: [{ msg: "Property doesn't exist" }] });

    let property = {
      address: rows[0].address,
      rent: rows[0].rent,
      lease_date: rows[0].lease_date,
      capacity: rows[0].capacity,
      landlord_id: rows[0].landlord_id,
      file_name: rows[0].file_name,
    };

    return res.status(200).json(property);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

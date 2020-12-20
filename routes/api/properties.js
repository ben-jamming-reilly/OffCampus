const express = require("express");
const router = express.Router();
const multer = require("multer");
const fs = require("fs");
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

const config = require("config");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    cb(null, String(file.fieldname + "-" + Date.now() + "." + parts[1]));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
});

router.post("/", [auth, upload.single("image")], async (req, res) => {
  let form = JSON.parse(req.body.data);
  try {
    let conn = await getConn();

    await conn.query(
      "" +
        "INSERT INTO Property (address, rent, capacity, lease_date, file_name)" +
        "VALUES (?, ?, ?, ?, ?)",
      [
        form.address,
        form.rent,
        form.capacity,
        form.lease_date,
        req.file.filename,
      ]
    );

    await conn.query(
      "INSERT INTO Review (user_id, address, review) VALUES (?, ?, ?) ",
      [req.user.id, form.address, form.review]
    );

    conn.close();
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    let conn = await getConn();

    const [rows, fields] = await conn.query("SELECT * FROM Property; ", []);
    conn.close();
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

router.get("/rent", async (req, res) => {
  try {
    let conn = await getConn();

    const [rows, fields] = await conn.query(
      "SELECT * FROM Property ORDER BY rent; ",
      []
    );
    conn.close();
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
    let conn = await getConn();

    const [rows, fields] = await conn.query(
      "" +
        "SELECT P.address, P.rent, P.lease_date, P.capacity, P.landlord_id, P.file_name " +
        "FROM Property P JOIN Review R USING(address) " +
        "GROUP BY P.address " +
        "ORDER BY COUNT(*); ",
      []
    );
    conn.close();
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
    let conn = await getConn();
    const [rows, fields] = await conn.query(
      "SELECT * FROM Property ORDER BY capacity; ",
      []
    );
    conn.close();
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
    let conn = await getConn();

    const [rows, fields] = await conn.query(
      "" + "SELECT * FROM Property WHERE address = ?",
      [address]
    );

    if (rows.length != 1)
      return res
        .status(400)
        .json({ errors: [{ msg: "Property doesn't exist" }] });

    conn.close();

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

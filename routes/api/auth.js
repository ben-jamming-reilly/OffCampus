const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const config = require("config");

const db = require("../../utils/db");

// Gets personal user auth information
router.get("/", auth, async (req, res) => {
  const id = req.user.id;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT user_id as id, email, first_name, last_name FROM User WHERE user_id = ?; ",
      [id]
    );

    return res.json(rows[0]);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

// Allows user to login for each
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT user_id, password FROM User WHERE email = ? ; ",
      [email]
    );

    // if user is not found
    if (rows.length != 1)
      return res.status(400).json({ errors: [{ msg: "User doesn't exist" }] });

    const isMatch = await bcrypt.compare(password, rows[0].password);

    if (!isMatch)
      return res.status(400).json({ errors: [{ msg: "Invalid Password" }] });

    const payload = {
      user: {
        id: rows[0].user_id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 7200 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

router.post("/register", async (req, res) => {
  const { email, first_name, last_name, password } = req.body;

  try {
    const [
      rows,
      fields,
    ] = await db.query("SELECT user_id FROM User WHERE email = ?; ", [email]);

    // Confirm that email or user_name have not been registered
    if (rows.length > 0) {
      console.log("Email collision");
      return res
        .status(400)
        .json({ errors: [{ msg: "Email already registered" }] });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();

    await db.query(
      "INSERT INTO User (user_id, first_name, last_name, email, password) " +
        "VALUES (?, ?, ?, ?, ?); ",
      [id, first_name, last_name, email, hashPassword]
    );

    const payload = {
      user: {
        id: id,
      },
    };

    jwt.sign(
      payload,
      config.get("jwtSecret"),
      { expiresIn: 7200 },
      (err, token) => {
        if (err) throw err;
        return res.json({ token });
      }
    );
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

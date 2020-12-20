const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { v4: uuidv4 } = require("uuid");
const auth = require("../../middleware/auth");
const config = require("config");

const db = require("../../utils/db");

router.get("/", auth, async (req, res) => {
  const id = req.user.id;
  try {
    let conn = await getConn();
    const [
      rows,
      fields,
    ] = await conn.query("SELECT * FROM User WHERE user_id = ?", [id]);

    const user = {
      id: rows[0].user_id,
      user_name: rows[0].user_name,
      email: rows[0].email,
      group_id: rows[0].group_id,
    };

    conn.close();
    return res.json(user);
  } catch (err) {
    console.log(err.message);
    return res.status(500).send("Server Error :(");
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    let conn = await getConn();

    const [
      rows,
      fields,
    ] = await conn.query("SELECT * FROM User WHERE email = ? LIMIT 1; ", [
      email,
    ]);

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

    conn.close();
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
  const { user_name, email, password } = req.body;

  console.log(req.body);
  try {
    let conn = await getConn();

    const [
      rows,
      fields,
    ] = await conn.query("SELECT * FROM User WHERE email = ?; ", [email]);

    // SQL -> check if email has been registered
    if (rows.length > 0)
      return res.status(400).json({ errors: [{ msg: "User already exists" }] });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);
    const id = uuidv4();

    console.log(String(hashPassword).length);

    await conn.query(
      "" +
        "INSERT INTO User (user_id, user_name, email, password) " +
        "VALUES (?, ?, ?, ?); ",
      [id, user_name, email, hashPassword]
    );

    const payload = {
      user: {
        id: id,
      },
    };

    conn.close();
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

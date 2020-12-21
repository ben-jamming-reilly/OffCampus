const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

// Leave a review for a house
router.post("/:zip/:city/:street", auth, async (req, res) => {
  const { zip, city, street } = req.params;
  const { review, rating } = req.body;

  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "INSERT INTO Review (user_id, street, city, zip, review, rating) " +
        "VALUES (?, ?, ?, ?, ?, ?); ",
      [req.user.id, address, review]
    );

    return res.status(201).json({ msg: "Property Added!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Leave a like for a review
router.post("/like", auth, async (req, res) => {
  const { user_id, street, city, zip } = req.body;

  try {
    await db.query(
      "INSERT INTO Upvote (user_id, street, city, zip, upvoter_user_id) " +
        "VALUES (?, ?, ?, ?, ?); ",
      [user_id, street, city, zip, req.user.id]
    );

    return res.status(200).json({ msg: "You just liked a message!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Remove a like for a review
router.post("/unlike", auth, async (req, res) => {
  const { user_id, street, city, zip } = req.body;

  try {
    await db.query(
      "DELETE FROM Upvote " +
        "WHERE user_id = ? AND street = ? AND city = ? AND zip = ? AND upvoter_user_id = ? " +
        "VALUES (?, ?, ?, ?, ?); ",
      [user_id, street, city, zip, req.user.id]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Get all reviews for a house
router.get("/:zip/:city/:street", async (req, res) => {
  const { zip, city, street } = req.params;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes  " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(zip, city, street) " +
        "WHERE zip = ? AND city = ? AND street  = ? " +
        "GROUP BY R.user_id " +
        "ORDER BY likes; ",
      [zip, city, street]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

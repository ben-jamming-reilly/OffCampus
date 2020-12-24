const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

// Add/Update a review for a property
router.post("/:zip/:city/:street", auth, async (req, res) => {
  const { zip, city, street } = req.params;
  const { review, rating } = req.body;
  const id = req.user.id;

  try {
    // see if a review exists already
    const [rows, fields] = await db.query(
      "SELECT user_id FROM Review " +
        "WHERE user_id = ? AND zip = ? AND city = ? AND street = ?; ",
      [id, zip, city, street]
    );

    if (rows.length > 0) {
      // Update review
      await db.query(
        "UPDATE Review " +
          "SET review = ?, rating = ? " +
          "WHERE user_id = ? AND zip = ? AND city = ? AND street = ?; ",
        [review, rating, id, zip, city, street]
      );

      return res.status(200).json({ msg: "Review Updated!" });
    }

    await db.query(
      "INSERT INTO Review (user_id, zip, city, street, review, rating) " +
        "VALUES (?, ?, ?, ?, ?, ?); ",
      [id, zip, city, street, review, rating]
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
      "SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(zip, city, street) " +
        "WHERE R.zip = ? AND R.city = ? AND R.street  = ? " +
        "GROUP BY R.user_id " +
        "ORDER BY likes DESC; ",
      [zip, city, street]
    );

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

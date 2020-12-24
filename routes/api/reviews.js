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

    return res.status(201).json({ msg: "Review Added!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Leave a like for a review
router.post("/like", auth, async (req, res) => {
  const { review, property } = req.body;

  try {
    await db.query(
      "INSERT INTO Upvote (user_id, street, city, zip, upvoter_user_id) " +
        "VALUES (?, ?, ?, ?, ?); ",
      [
        review.user_id,
        property.street,
        property.city,
        property.zip,
        req.user.id,
      ]
    );

    return res.status(200).json({ msg: "You just liked a message!" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Remove a like for a review
router.post("/unlike", auth, async (req, res) => {
  const { review, property } = req.body;

  try {
    await db.query(
      "DELETE FROM Upvote " +
        "WHERE user_id = ? AND street = ? AND city = ? AND zip = ? AND upvoter_user_id = ? ",
      [
        review.user_id,
        property.street,
        property.city,
        property.zip,
        req.user.id,
      ]
    );

    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Get all reviews for a house, not logged in
router.get("/:zip/:city/:street", async (req, res) => {
  const { zip, city, street } = req.params;
  try {
    let [
      rows,
      fields,
    ] = await db.query(
      "SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(user_id, zip, city, street) " +
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

// Get all reviews for a house, logged in
router.get("/:zip/:city/:street/:id", async (req, res) => {
  const { zip, city, street, id } = req.params;

  try {
    // This is overall quite slow, i feel that this could be done in a n log (n) way
    // possibly by doing a sort. Its fine for now...
    let [
      rows,
      fields,
    ] = await db.query(
      "SELECT U.user_name, U.user_id, R.review, R.rating, COUNT(Up.upvoter_user_id) as likes " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(user_id, zip, city, street) " +
        "WHERE R.zip = ? AND R.city = ? AND R.street  = ? " +
        "GROUP BY R.user_id " +
        "ORDER BY likes DESC; ",
      [zip, city, street]
    );

    let [
      rows2,
      fields2,
    ] = await db.query(
      "SELECT R.user_id, R.street, R.city, R.zip, COUNT(Up.upvoter_user_id) as likes " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(user_id, zip, city, street) " +
        "WHERE R.zip = ? AND R.city = ? AND R.street  = ? AND Up.upvoter_user_id = ? " +
        "GROUP BY R.user_id " +
        "ORDER BY likes DESC; ",
      [zip, city, street, id]
    );

    for (let i = 0; i < rows.length; i++) {
      rows[i].isLiked = false;

      for (let j = 0; j < rows2.length; j++) {
        if (rows[i].user_id === rows2[j].user_id) {
          rows[i].isLiked = true;
          break;
        }
      }
    }

    return res.status(200).json(rows);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

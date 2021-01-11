const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const captcha = require("../../middleware/captcha");
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

// Add a review by captcha
router.post("/captcha/:zip/:city/:street", captcha, async (req, res) => {
  const { zip, city, street } = req.params;
  const { formData } = req.body;

  try {
    await db.query(
      "INSERT INTO Review (street, city, zip, body, rating, post_date) " +
        "VALUES ( ?, ?, ?, ?, ?, NOW()); ",
      [street, city, zip, formData.body, formData.rating]
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
    await db.query("INSERT INTO Upvote (review_id, user_id) VALUES (?, ?); ", [
      review.review_id,
      req.user.id,
    ]);

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
    await db.query("DELETE FROM Upvote WHERE review_id = ? AND user_id = ? ", [
      review.review_id,
      req.user.id,
    ]);

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
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT review_id, body, rating, post_date, COUNT(Up.user_id) as likes " +
        "FROM Review LEFT JOIN Upvote Up USING (review_id) " +
        "WHERE zip = ? AND city = ? AND street  = ? " +
        "GROUP BY review_id " +
        "ORDER BY likes DESC, review_id DESC; ",
      [String(zip), city, street]
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
      "SELECT review_id, body, rating, post_date, COUNT(Up.user_id) as likes " +
        "FROM Review R LEFT JOIN Upvote Up USING (review_id)" +
        "WHERE zip = ? AND city = ? AND street  = ?  " +
        "GROUP BY R.review_id " +
        "ORDER BY likes DESC, review_id DESC; ",
      [String(zip), city, street]
    );

    let [
      likedReviews,
      fields2,
    ] = await db.query(
      "SELECT R.review_id, COUNT(Up.user_id) as likes " +
        "FROM Review R JOIN Upvote Up USING (review_id) " +
        "WHERE R.zip = ? AND R.city = ? AND R.street  = ? AND Up.user_id = ? " +
        "GROUP BY R.review_id " +
        "ORDER BY likes DESC, review_id DESC; ",
      [String(zip), city, street, id]
    );

    // Sets isLiked for each review,
    // This is the better O(N) liked algo than one commented out
    // below
    let likedReviewIndex = 0;
    if (likedReviews.length > 0) {
      for (let i = 0; i < rows.length; i++) {
        rows[i].isLiked = false;

        if (rows[i].review_id === likedReviews[likedReviewIndex].review_id) {
          likedReviewIndex++;
          rows[i].isLiked = true;

          if (likedReviewIndex >= likedReviews.length) break;
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

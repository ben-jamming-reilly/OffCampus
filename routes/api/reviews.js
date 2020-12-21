const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");
const db = require("../../utils/db");

// Leave a review for a house
router.post("/:zip/:city/:street", auth, async (req, res) => {
  const address = req.params.address;
  const { review } = req.body;

  try {
    const [rows, fields] = await db.query(
      "" +
        "INSERT INTO Review (user_id, address, review) " +
        "VALUES (?, ?, ?); ",
      [req.user.id, address, review]
    );

    return res.status(201).json({ success: true });
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
router.get("/:address", async (req, res) => {
  const address = req.params.address;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT U.user_name, U.user_id, R.review, COUNT(Up.liker_user_id) as likes  " +
        "FROM User U JOIN Review R USING(user_id) " +
        "LEFT JOIN Upvote Up Using(address) " +
        "WHERE R.address = ? " +
        "GROUP BY R.user_id " +
        "ORDER BY likes; ",
      [address]
    );

    let reviews = [];
    rows.forEach((element) => {
      reviews.push({
        text: element.review,
        user_name: element.user_name,
        user_id: element.user_id,
        num_likes: element.likes,
      });
    });

    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

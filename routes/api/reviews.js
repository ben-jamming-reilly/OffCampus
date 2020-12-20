const express = require("express");
const router = express.Router();
const auth = require("../../middleware/auth");

// Leave a like for a review
router.post("/like", auth, async (req, res) => {
  console.log(req.body);
  const { review, address } = req.body;
  try {
    let conn = await getConn();

    await conn.query(
      "" +
        "INSERT INTO Upvote (user_id, address, liker_user_id) " +
        "VALUES (?, ?, ?); ",
      [review.user_id, address, req.user.id]
    );

    conn.close();
    return res.status(200).json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Remove a like for a review
router.post("/unlike", auth, async (req, res) => {
  console.log(req.body);
  const { review, address } = req.body;

  try {
    let conn = await getConn();

    await conn.query(
      "" +
        "DELETE FROM Upvote WHERE user_id = ? AND address = ? AND liker_user_id = ?; " +
        "VALUES (?, ?, ?); ",
      [review.user_id, address, req.user.id]
    );

    conn.close();
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
    let conn = await getConn();

    const [rows, fields] = await conn.query(
      "" +
        "SELECT U.user_name, U.user_id, R.review, COUNT(Up.liker_user_id) as likes  " +
        "FROM User U JOIN Review R USING(user_id) " +
        " LEFT JOIN Upvote Up Using(address) " +
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

    conn.close();
    return res.status(200).json(reviews);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

// Leave a review for a house
router.post("/:address", auth, async (req, res) => {
  const address = req.params.address;
  const { review } = req.body;
  try {
    let conn = await getConn();

    const [rows, fields] = await conn.query(
      "" +
        "INSERT INTO Review (user_id, address, review) " +
        "VALUES (?, ?, ?); ",
      [req.user.id, address, review]
    );

    conn.close();
    return res.status(201).json({ success: true });
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

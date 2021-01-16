const express = require("express");
const router = express.Router();

const db = require("../../utils/db");

// Gets the profile page for the landlord
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const [
      rows,
      fields,
    ] = await db.query(
      "SELECT landlord_id, company_name, phone, email, street, city, zip, file_name " +
        "FROM Landlord WHERE landlord_id = ? LIMIT 1; ",
      [id]
    );

    return res.status(200).json(rows[i]);
  } catch (err) {
    console.error(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

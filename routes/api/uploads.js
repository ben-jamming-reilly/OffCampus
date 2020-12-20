const express = require("express");
const router = express.Router();
const fs = require("fs");

// Gives a certain image to the browser
router.get("/:filename", async (req, res) => {
  const filename = String(req.params.filename);
  try {
    //let readstream
    let readstream = fs.createReadStream("./uploads/" + filename);

    readstream.on("error", () => {
      // Load in meme if file doesn't exist
      let notFoundStream = fs.createReadStream("./uploads/doesntExist.jpg");
      notFoundStream.pipe(res);
    });

    readstream.pipe(res);
  } catch (err) {
    console.err(err.message);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;

const multer = require("multer");
const fs = require("fs");

const storageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./uploads/");
  },
  filename: (req, file, cb) => {
    const parts = file.mimetype.split("/");
    cb(null, String(file.fieldname + "-" + Date.now() + "." + parts[1]));
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploads = multer({
  storage: storageEngine,
  fileFilter: fileFilter,
});

module.exports = uploads;

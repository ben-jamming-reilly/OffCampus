const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

app.use("/uploads", require("./routes/api/uploads"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/properties", require("./routes/api/properties"));
app.use("/api/reviews", require("./routes/api/reviews"));
app.use("/api/users", require("./routes/api/users"));

console.log(process.env);
if (process.env.NODE_ENV === "production") {
  //set static file
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("Server started on " + PORT));

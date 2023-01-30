const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user");
const cards = require("./routes/cards");
const cors = require("cors");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();
app.use(cors());
// allow cross-origin requests
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// PORT
const PORT = process.env.PORT || 4000;

// Middleware
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.json({ message: "API Working" });
});

app.use("/auth", user);
app.use("/cards", cards);

app.listen(PORT, (req, res) => {
  console.log(`Server Started at PORT ${PORT}`);
});


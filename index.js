const express = require("express");
const bodyParser = require("body-parser");
const InitiateMongoServer = require("./config/db");
const user = require("./routes/user");
const cards = require("./routes/cards");
// Initiate Mongo Server
InitiateMongoServer();

const app = express();

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


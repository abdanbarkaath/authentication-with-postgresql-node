const express = require("express");
const cors = require("cors");
const pool = require("./db");

const PORT = process.env.PORT || 5000;

var app = express();

//middleware
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

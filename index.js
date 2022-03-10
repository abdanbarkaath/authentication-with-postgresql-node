const express = require("express");
const cors = require("cors");
const pool = require("./db");

var app = express();

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("port running on 5000");
});

const express = require("express");
const cors = require("cors");
const authRoute = require("./router/jwt-auth");

const PORT = process.env.PORT || 5000;

var app = express();
//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use("/auth", authRoute);

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

const express = require("express");
const cors = require("cors");
const pool = require("./db");
const bcrypt = require("bcrypt");

const PORT = process.env.PORT || 5000;

var app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", async (req, res) => {
  const data = await pool.query("SELECT * FROM users;");
  res.send(data.rows);
});

//register user

app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  let errors = [];
  if (!name || !email || !password) {
    errors.push({ message: "Please enter all fields" });
  }

  if (password.length < 6) {
    errors.push({ message: "Please enter at least 6 characters" });
  }

  if (errors.length > 0) {
    res.send({ errors });
  } else {
    const hashedPassword = await bcrypt.hash(password, 10);
    const doesUserExist = await pool.query(
      "SELECT * FROM users WHERE email = $1",
      [email]
    );
    if (doesUserExist.rows.length > 0) {
      errors.push({ message: "Email already exists" });
      res.send({ errors });
    } else {
      const createdUser = await pool.query(
        "INSERT INTO users(name, email, password) VALUES($1, $2, $3)",
        [name, email, hashedPassword],
        (err, result) => {
          if (result) {
            res.send({ success: true });
          }
        }
      );
    }
  }

  // res.send("post user");
});

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

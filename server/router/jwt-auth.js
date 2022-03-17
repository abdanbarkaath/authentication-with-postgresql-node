const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const generateJwt = require("../jwt-generator/jwt-generator");
//register user
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let errors = [];
    if (!name || !email || !password) {
      errors.push({ message: "Please enter all fields" });
    }

    if (password.length < 6) {
      errors.push({ message: "Please enter at least 6 characters" });
    }
    console.log(errors);
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
        res.status(401).send({ errors });
      } else {
        const newUser = await pool.query(
          "INSERT INTO users(name, email, password) VALUES($1, $2, $3) RETURNING *",
          [name, email, hashedPassword]
        );

        if (newUser.rows.length > 0) {
          const token = generateJwt(newUser.rows[0].id);
          console.log(token);
          res.json({ token });
        } else {
          errors.push({ message: "something went wrong" });
          res.status(500).send({ errors });
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
});

//authenticate and login user

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    let errors = [];
    const user = await pool.query("SELECT * FROM users WHERE email = $1;", [
      email,
    ]);
    if (user.rows.length === 0) {
      errors.push({ message: "No such user exists" });
      res.status(401).send(errors);
    }
    const isMatch = await bcrypt.compare(password, user.rows[0].password);
    console.log(isMatch);
    if (!isMatch) {
      errors.push({ message: "Passowrd does not match" });
      res.status(401).send({ errors });
    }
    const token = generateJwt(user.rows[0].id);
    res.send({ token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;

const router = require("express").Router();
const bcrypt = require("bcrypt");
const pool = require("../db");
const generateJwt = require("../jwt-generator/jwt-generator");
const validEmail = require("../middleware/valid-info");
const authorizeMiddleware = require("../middleware/authorization");

//register user
router.post("/register", validEmail, async (req, res) => {
  try {
    const { name, email, password } = req.body;
    let errors = [];

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
        res.status(200).json({ token });
      } else {
        errors.push({ message: "something went wrong" });
        res.status(500).send({ errors });
      }
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("something went wrong");
  }
});

//authenticate and login user

router.post("/login", validEmail, async (req, res) => {
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
    if (!isMatch) {
      errors.push({ message: "Passowrd does not match" });
      res.status(401).send({ errors });
    }
    const token = generateJwt(user.rows[0].id);
    res.status(200).send({ token });
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

//Verify user with jwt
router.get("/is-verified", authorizeMiddleware, (req, res) => {
  try {
    res.json(true);
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

module.exports = router;

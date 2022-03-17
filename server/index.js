const express = require("express");
const cors = require("cors");
const authRoute = require("./router/jwt-auth");

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

app.use("/auth", authRoute);

//authenticate and login user

// app.post("/login", (req, res) => {
//   const { email, password } = req.body;
//   let errors = [];
//   pool.query(
//     "SELECT * FROM users WHERE email = $1;",
//     [email],
//     (err, result) => {
//       if (err) {
//         errors.push({ message: "No Such email exists" });
//         res.send({ errors });
//         throw err;
//       } else {
//         if (result.rows.length > 0) {
//           bcrypt.compare(
//             password,
//             result.rows[0].password,
//             function (err, isMatch) {
//               if (err) {
//                 throw err;
//               }
//               if (!isMatch) {
//                 errors.push({ message: "Passowrd does not match" });
//                 res.send({ errors });
//               } else {
//                 res.send({
//                   user: {
//                     name: result.rows[0].name,
//                     email: result.rows[0].email,
//                     id: result.rows[0].id,
//                   },
//                 });
//               }
//             }
//           );
//         } else {
//           errors.push({ message: "No Such email exists" });
//           res.send({ errors });
//         }
//       }
//     }
//   );
// });

app.listen(PORT, () => {
  console.log(`port running on ${PORT}`);
});

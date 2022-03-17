const jwt = require("jsonwebtoken");

const generateJwt = (userId) => {
  const payload = {
    user: userId,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
};

module.exports = generateJwt;

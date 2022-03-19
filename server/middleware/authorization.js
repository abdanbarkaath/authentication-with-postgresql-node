const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = async (req, res, next) => {
  try {
    const jwtToken = req.header("token");
    if (!jwtToken) {
      return res.status(403).json("Not Authorized");
    }
    //verify heder token with the secretn env key
    const payload = jwt.verify(jwtToken, process.env.JWT_SECRET);
    console.log(payload);
    req.user = payload.user;
    next();
  } catch (error) {
    res.status(403).json("Not Authorized");
  }
};

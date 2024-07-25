const jwt = require("jsonwebtoken");
require('dotenv').config();


const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", process.env.SECRET_KEY);
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }
  jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
    console.log(err, decoded);
    if (err) {
      return res.status(500).send({ message: "Failed to authenticate token." });
    }

    // Save the decoded token payload to request for use in other routes
    // req.userId = decoded.id;
    next();
  });
};

module.exports = { verifyToken };

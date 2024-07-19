const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  console.log("token", token);
  if (!token) {
    return res.status(403).send({ message: "No token provided." });
  }

  jwt.verify(token, "jaskaranPreetSingh9478679211", (err, decoded) => {
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

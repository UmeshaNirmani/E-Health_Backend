require("dotenv").config();
const jwt = require("jsonwebtoken");

// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

function verifyToken(req, res, next) {
  // Get auth header value
  const bearerHeader = req.headers["authorization"];

  if (typeof bearerHeader !== "undefined") {
    const bearer = bearerHeader.split(" ");
    const bearerToken = bearer[1];
    // Set the token
    req.token = bearerToken;
    next();
  } else {
    res.sendStatus(403);
  }
}

module.exports = verifyToken;

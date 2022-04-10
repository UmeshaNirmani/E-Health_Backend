require("dotenv").config();
const jwt = require("jsonwebtoken");
// FORMAT OF TOKEN
// Authorization: Bearer <access_token>

// Verify Token middleware
function verifyToken(req, res, next) {
  // get auth header value
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  if (token == null) return res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    console.log(err);
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

module.exports = verifyToken;

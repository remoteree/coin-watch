//Middleware function that checks if the user is authorized by verifying their jwt token

const jwt = require("jsonwebtoken");

function auth(req, res, next) {
  const token = req.header("x-auth-token");
  if (!token) return res.status(400).send("Access Denied. No token provided.");
  // This looks for the token in the header with the name x-auth-token and if its not found
  // it returns access denied for anytime a user wants to handle a request

  try {
    // This decodes the token and returns the payload and the next moves on to the route handler
    const decoded = jwt.verify(token, process.env.jwtPrivateKey);

    req.user = decoded;
    next();
  } catch (ex) {
    res.status(400).send("Invalid token");
  }
}

module.exports = auth;

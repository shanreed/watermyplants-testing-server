const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decodedToken) => {
      if (err) {
        console.log("Failed", err);
        res.status(401).json({
          message: "Not verified"
        });
      } else {
        // token is valid
        req.decodedToken = decodedToken;
        next();
      }
    });
  } else {
    res.status(400).json({
      message: "No token provided"
    });
  }
};
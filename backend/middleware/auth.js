const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {

  try {

    // Get Authorization header
    const authHeader = req.headers.authorization;

    // Check if token exists
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        message: "Access Denied. No token provided."
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    // Save user info in request
    req.user = decoded;

    next();

  } catch (err) {

    return res.status(401).json({
      message: "Invalid or Expired Token"
    });

  }

};

module.exports = auth;
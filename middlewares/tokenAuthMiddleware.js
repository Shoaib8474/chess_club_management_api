require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { User } = require("../models");


// JWT verification middleware
const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // // Add token expiration check
    // if (decoded.exp < Date.now() / 1000) {
    //   return res.status(401).json({ message: 'Token has expired' });
    // }

    // Store decoded info for use in isAdmin middleware
    req.decodedToken = decoded;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: "Server error during authentication" });
  }
};

module.exports = authMiddleware;

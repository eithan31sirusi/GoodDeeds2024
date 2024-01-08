// middleware/auth.js
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    console.log("Token:", token); // Log for debugging

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded.id });

    if (!user) {
      throw new Error("User not found with this token");
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    console.log("Auth error:", error); // Enhanced error logging
    res.status(401).send({ error: "Please authenticate." });
  }
};

const admin = async (req, res, next) => {
  if (req.user.role !== "admin") {
    return res.status(403).send({ error: "Access denied." });
  }
  next();
};

module.exports = { auth, admin };

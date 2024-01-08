const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const userController = {
  register: async (req, res) => {
    try {
      // Extract info from request body
      const { username, email, password, role } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).send("User already exists");
      }

      // Create a new user
      const user = new User({ username, email, password, role });
      await user.save();

      // Create token for the new user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send success response with token
      res.status(201).send({ message: "User registered successfully", token });
    } catch (error) {
      res.status(500).send("Error in registration");
    }
  },
  login: async (req, res) => {
    try {
      // Extract info from request body
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send("User not found");
      }
      console.log("Stored Hashed Password:", user.password);
      // Check password
      const isMatch = await bcrypt.compare(password, user.password);
      console.log(password, "eeeee", user.password, "sssss");
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }

      // Create token for the logged-in user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      // Send success response with token
      res.status(200).send({ token });
    } catch (error) {
      console.log("Login error:", error);
      res.status(500).send("Error in login");
    }
  },
};

module.exports = userController;

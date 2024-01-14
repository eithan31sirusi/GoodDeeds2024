const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { registerSchema, loginSchema } = require("../validation/userValidation");

const userController = {
  register: async (req, res) => {
    try {
      const { error } = registerSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      // Extract info from request body
      const { username, email, password, role, personalDeeds } = req.body;

      // Check if user already exists
      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(400).send("User already exists");
      }

      // Create a new user
      const user = new User({ username, email, password, role, personalDeeds });
      await user.save();

      // Create token for the new user
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "12h",
      });

      // Send success response with token
      res.status(201).send({ message: "User registered successfully", token });
    } catch (error) {
      res.status(500).send("Error in registration");
    }
  },
  login: async (req, res) => {
    try {
      const { error } = loginSchema.validate(req.body);
      // Extract info from request body
      const { email, password } = req.body;

      if (error) {
        return res.status(400).send(error.details[0].message);
      }

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
        expiresIn: "12h",
      });

      // Send success response with token
      res.status(200).send({ token });
    } catch (error) {
      console.log("Login error:", error);
      res.status(500).send("Error in login");
    }
  },

  getUserProfile: async (req, res) => {
    try {
      // Check if the logged-in user is an admin
      if (req.user.role === "admin") {
        // If admin, fetch and return all users
        const users = await User.find({}).select("-password");
        return res.status(200).send(users);
      }

      // If regular user, return their data only
      const user = await User.findById(req.user._id).select("-password");
      res.status(200).send(user);
    } catch (error) {
      res.status(500).send("Error fetching user profile");
    }
  },

  updateUserProfile: async (req, res) => {
    try {
      const updates = Object.keys(req.body);
      const allowedUpdates = ["username", "email"]; // Add more fields as needed
      const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
      );

      if (!isValidOperation) {
        return res.status(400).send({ error: "Invalid updates!" });
      }

      const user = await User.findById(req.user._id).select("-password");

      const existsEmail = req.body.email;
      if (existsEmail === user.email) {
        return res.status(400).send("User already exists");
      }

      updates.forEach((update) => (user[update] = req.body[update]));
      await user.save();

      res.status(200).send(user);
    } catch (error) {
      res.status(500).send("Error updating user profile");
    }
  },
  removeUser: async (req, res) => {
    try {
      const user = await User.findById(req.params.userId);
      if (!user) {
        return res.status(404).send("User not found");
      }
      await user.remove();
      res.status(200).send({ message: "User removed" });
    } catch (error) {
      res.status(500).send("Error removing user");
    }
  },

  // Change Password

  changePassword: async (req, res) => {
    try {
      const { oldPassword, newPassword } = req.body;
      const user = req.user; // User from auth middleware

      // Check if old password is correct
      const isMatch = await bcrypt.compare(oldPassword, user.password);
      if (!isMatch) {
        return res.status(400).send("Old password is incorrect.");
      }

      // Check if the new password is the same as the old password
      const isNewPasswordSameAsOld = await bcrypt.compare(
        newPassword,
        user.password
      );
      if (isNewPasswordSameAsOld) {
        return res
          .status(400)
          .send("New password must be different from the current password.");
      }

      // Directly assign the new password, let the pre-save middleware handle hashing
      user.password = newPassword;

      await user.save();

      res.status(200).send("Password successfully updated.");
    } catch (error) {
      res.status(500).send("Error updating password.");
    }
  },
};

module.exports = userController;

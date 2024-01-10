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
        expiresIn: "1h",
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
  // In your userController.js
  requestPasswordReset: async (req, res) => {
    try {
      const user = await User.findOne({ email: req.body.email });
      if (!user) {
        return res.status(404).send("User not found");
      }

      // Generate a token
      const token = crypto.randomBytes(32).toString("hex");
      user.passwordResetToken = crypto
        .createHash("sha256")
        .update(token)
        .digest("hex");
      user.passwordResetExpires = Date.now() + 3600000; // 1 hour

      await user.save();

      // Send the token to the user's email
      // sendEmail(user.email, token);

      res.status(200).send("Password reset token sent to email");
    } catch (error) {
      res.status(500).send("Error in requesting password reset");
    }
  },

  // In your userController.js
  resetPassword: async (req, res) => {
    try {
      const hashedToken = crypto
        .createHash("sha256")
        .update(req.params.token)
        .digest("hex");

      const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: { $gt: Date.now() },
      });

      if (!user) {
        return res.status(400).send("Token is invalid or has expired");
      }

      user.password = await bcrypt.hash(req.body.password, 8);
      user.passwordResetToken = undefined;
      user.passwordResetExpires = undefined;
      await user.save();

      res.status(200).send("Password has been reset");
    } catch (error) {
      res.status(500).send("Error resetting password");
    }
  },
};

module.exports = userController;

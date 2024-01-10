const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const { auth, admin } = require("../middleware/auth");

// Register a new user
router.post("/register", userController.register);

// Login user
router.post("/login", userController.login);

//  Getting User Profile
router.get("/profile", auth, userController.getUserProfile);

//  Updating User Profile
router.patch("/profile", auth, userController.updateUserProfile);

//  Deleting User Profile
router.delete("/:userId", auth, admin, userController.removeUser);

// Changing Password
router.post("/change-password", auth, userController.changePassword);

module.exports = router;

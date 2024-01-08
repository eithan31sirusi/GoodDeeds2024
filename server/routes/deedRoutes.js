const express = require("express");
const router = express.Router();
const deedController = require("../controllers/deedController");
const { auth, admin } = require("../middleware/auth");

// Create a new deed
router.post("/global", auth, admin, deedController.createGlobalDeed);

router.post("/personal", auth, deedController.createPersonalDeed);

// Get all deeds
router.get("/", deedController.getAllDeeds);

// Get a single deed by ID
router.get("/:id", deedController.getDeedById);

// Update a deed
router.put("/:id", deedController.updateDeed);

// Delete a deed
router.delete("/:id", deedController.deleteDeed);

router.post("/submit-observation", auth, deedController.submitForObservation);

module.exports = router;

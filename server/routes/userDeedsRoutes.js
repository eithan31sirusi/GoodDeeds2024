const express = require("express");
const router = express.Router();
const userDeedsController = require("../controllers/userDeedsController");
const { auth } = require("../middleware/auth");

// Add a deed to the user's personal list (from global list or new personal deed)
router.post(
  "/:userId/add-deed",
  auth,
  userDeedsController.addDeedToPersonalList
);

// Creates and add user custom deed
router.post(
  "/:userId/create-deed",
  auth,
  userDeedsController.createAndAddPersonalDeed
);

// Get the user's personal list of deeds
router.get("/:userId/personal-list", auth, userDeedsController.getPersonalList);

// Update a deed in the user's personal list
router.put(
  "/:userId/update-deed/:deedId",
  auth,
  userDeedsController.updatePersonalDeed
);

// Delete a deed from the user's personal list
router.delete(
  "/:userId/delete-deed/:deedId",
  auth,
  userDeedsController.deletePersonalDeed
);

module.exports = router;

const User = require("../models/User");
const Deed = require("../models/Deed");

const userDeedsController = {
  addDeedToPersonalList: async (req, res) => {
    const { userId } = req.params;
    const { deedId } = req.body;
    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      const deed = await Deed.findById(deedId);
      if (!deed) {
        return res.status(404).send("Deed not found");
      }

      // Check if the deed is already in the user's personal list
      if (user.personalDeeds.includes(deedId)) {
        return res.status(400).send("Deed already in personal list");
      }

      user.personalDeeds.push(deedId);
      await user.save();

      res.status(200).send({ message: "Deed added to personal list", deed });
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  createAndAddPersonalDeed: async (req, res) => {
    const userId = req.user._id;
    const deedData = req.body;

    try {
      // Create a new deed with the provided data
      const newDeed = new Deed({
        ...deedData,
        createdBy: userId,
        isGlobal: false, // Since it's a personal deed
      });

      await newDeed.save();

      // Add the new deed to the user's personal list
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      user.personalDeeds.push(newDeed._id);
      await user.save();

      res.status(201).send({
        message: "Personal deed created and added to your list",
        deed: newDeed,
      });
    } catch (error) {
      res.status(500).send("Error creating personal deed: " + error.message);
    }
  },

  getPersonalList: async (req, res) => {
    const { userId } = req.params;
    try {
      const user = await User.findById(userId).populate("personalDeeds");
      if (!user) {
        return res.status(404).send("User not found");
      }

      res.status(200).send(user.personalDeeds);
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  updatePersonalDeed: async (req, res) => {
    const userId = req.user._id;
    const deedId = req.params.deedId;

    try {
      const user = await User.findById(userId);
      if (!user || !user.personalDeeds.includes(deedId)) {
        return res.status(404).send("Deed not found in personal list");
      }
      // Check if the deed is personal and belongs to the user
      if (deed.isGlobal || deed.createdBy.toString() !== userId.toString()) {
        return res.status(403).send("Unauthorized to update this deed");
      }

      // Update logic for the deed, depending on what you allow to update
      const updatedDeed = await Deed.findByIdAndUpdate(deedId, req.body, {
        new: true,
      });
      res.status(200).send(updatedDeed);
    } catch (error) {
      res.status(500).send("Error updating personal deed: " + error.message);
    }
  },

  deletePersonalDeed: async (req, res) => {
    const userId = req.user._id;
    const deedId = req.params.deedId;

    try {
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).send("User not found");
      }

      user.personalDeeds = user.personalDeeds.filter(
        (deed) => deed.toString() !== deedId
      );
      await user.save();

      res.status(200).send({ message: "Deed removed from personal list" });
    } catch (error) {
      res
        .status(500)
        .send("Error removing deed from personal list: " + error.message);
    }
  },
};

module.exports = userDeedsController;

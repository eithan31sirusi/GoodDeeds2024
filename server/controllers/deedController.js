const Deed = require("../models/Deed");
const { createDeedSchema } = require("../validation/deedValidation");

const deedController = {
  // Create a Global Deed (Admin only)
  createGlobalDeed: async (req, res) => {
    try {
      // Validate request data
      const { error } = createDeedSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      const newDeed = new Deed({ ...req.body, isGlobal: true });
      await newDeed.save();
      res.status(201).send(newDeed);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Create a Personal Deed
  createPersonalDeed: async (req, res) => {
    try {
      // Extracting user ID from the authenticated user's request
      const userId = req.user._id;

      // Validate request data
      const { error } = createDeedSchema.validate(req.body);
      if (error) {
        return res.status(400).send(error.details[0].message);
      }

      // Creating a new personal deed with the user's ID
      const newDeed = new Deed({
        ...req.body,
        createdBy: userId,
        isGlobal: false,
      });
      await newDeed.save();

      res.status(201).send(newDeed);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Submit a Deed for Observation
  submitForObservation: async (req, res) => {
    try {
      // Extracting user ID from the authenticated user's request
      const userId = req.user._id;
      // Creating a new deed for review with the user's ID
      const newDeed = new Deed({
        ...req.body,
        createdBy: userId,
        isGlobal: false,
        status: "under_review",
      });
      await newDeed.save();
      res.status(201).send({ message: "Deed submitted for review", newDeed });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  reviewDeed: async (req, res) => {
    if (req.user.role !== "admin") {
      return res.status(403).send("Unauthorized");
    }
    try {
      const deedId = req.params.id;
      const { status } = req.body;

      const deed = await Deed.findById(deedId);
      if (!deed) {
        return res.status(404).send("Deed not found");
      }

      // If the deed is rejected, remove it
      if (status === "rejected") {
        await Deed.findByIdAndRemove(deedId);
        return res.status(200).send({ message: "Deed rejected and removed" });
      }

      // If the deed is approved, update its status and set it as global
      if (status === "approved") {
        deed.status = "approved";
        deed.isGlobal = true;
        await deed.save();
        return res
          .status(200)
          .send({ message: "Deed approved and updated", deed });
      }

      // If the status is neither approved nor rejected, handle accordingly
      return res.status(400).send({ message: "Invalid status update" });
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Get all Deeds (Global and Personal)
  getAllDeeds: async (req, res) => {
    try {
      const deeds = await Deed.find();
      res.status(200).send(deeds);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Get Deed by ID
  getDeedById: async (req, res) => {
    try {
      const deed = await Deed.findById(req.params.id);
      if (!deed) {
        return res.status(404).send();
      }
      res.status(200).send(deed);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Update Deed (with Admin verification for global deeds)
  updateDeed: async (req, res) => {
    try {
      const deed = await Deed.findById(req.params.id);
      if (!deed) {
        return res.status(404).send();
      }

      // Check if the deed is global and if the requester is an admin
      if (deed.isGlobal && req.user.role !== "admin") {
        return res.status(403).send("Unauthorized to update global deed");
      }

      const updatedDeed = await Deed.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).send(updatedDeed);
    } catch (error) {
      res.status(500).send(error);
    }
  },

  // Delete Deed (with Admin verification for global deeds)
  deleteDeed: async (req, res) => {
    try {
      const deed = await Deed.findById(req.params.id);
      if (!deed) {
        return res.status(404).send();
      }

      // Check if the deed is global and if the requester is an admin
      if (deed.isGlobal && req.user.role !== "admin") {
        return res.status(403).send("Unauthorized to delete global deed");
      }

      await deed.remove();
      res.status(200).send({ message: "Deed deleted successfully" });
    } catch (error) {
      res.status(500).send(error);
    }
  },
};

module.exports = deedController;

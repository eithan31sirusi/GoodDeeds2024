const Deed = require("../models/Deed");

const deedController = {
  // Create a Global Deed (Admin only)
  createGlobalDeed: async (req, res) => {
    try {
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
      const newDeed = new Deed({
        ...req.body,
        createdBy: req.user._id,
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
      const newDeed = new Deed({
        ...req.body,
        createdBy: req.user._id,
        isGlobal: false,
        status: "observation",
      });
      await newDeed.save();
      res.status(201).send(newDeed);
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

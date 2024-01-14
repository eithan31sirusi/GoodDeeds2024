const mongoose = require("mongoose");

const deedSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  isGlobal: { type: Boolean, default: false },
  status: {
    type: String,
    enum: ["ongoing", "completed", "new"],
    default: "new",
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

const Deed = mongoose.model("Deed", deedSchema);

module.exports = Deed;

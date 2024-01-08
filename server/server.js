// Import necessary modules
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

// Initialize express app
const app = express();

const userRoutes = require("./routes/userRoutes");
const deedRoutes = require("./routes/deedRoutes");

// Use middleware
app.use(cors());
app.use(express.json()); // for parsing application/json
app.use("/api/users", userRoutes);
app.use("/api/deeds", deedRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

// Define a simple route
app.get("/", (req, res) => {
  res.send("Hello, GoodDeeds!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

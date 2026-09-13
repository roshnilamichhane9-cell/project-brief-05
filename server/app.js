const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management System Backend is running successfully"
  });
});

// Test API route
app.use("/api/test", testRoutes);

module.exports = app;
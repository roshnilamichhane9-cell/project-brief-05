const express = require("express");
const cors = require("cors");

const testRoutes = require("./routes/testRoutes");
const productRoutes = require("./routes/productRoutes");
const requestLogger = require("./middleware/requestLogger");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(requestLogger);

// Home route
app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management System Backend is running successfully"
  });
});

// Test API route
app.use("/api/test", testRoutes);
app.use("/api/products", productRoutes);

app.use((error, req, res, next) => {
  if (
    error instanceof SyntaxError &&
    error.status === 400 &&
    Object.prototype.hasOwnProperty.call(error, "body")
  ) {
    return res.status(400).json({
      success: false,
      message: "Request body must contain valid JSON."
    });
  }

  return next(error);
});

module.exports = app;

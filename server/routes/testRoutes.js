const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Inventory Management System API is working",
    status: "OK"
  });
});

module.exports = router;
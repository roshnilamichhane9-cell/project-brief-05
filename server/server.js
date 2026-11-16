const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const app = require("./app");
const connectDatabase = require("./config/database");

const PORT = process.env.PORT || 5000;

async function startServer() {
  try {
    await connectDatabase();
  } catch (error) {
    const message = error instanceof Error ? error.message : "";
    const reason =
      message === "MONGODB_URI is not configured in server/.env."
        ? message
        : "Check MONGODB_URI and confirm the MongoDB service is available.";

    console.error(`MongoDB connection failed: ${reason}`);
  }

  app.listen(PORT, () => {
    console.log(`Inventory Management System server running on port ${PORT}`);
  });
}

startServer();
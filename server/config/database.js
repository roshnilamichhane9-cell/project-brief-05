const mongoose = require("mongoose");

const INITIAL_COLLECTION = "products";

async function connectDatabase() {
  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not configured in server/.env.");
  }

  await mongoose.connect(uri);

  const database = mongoose.connection.db;

  if (!database) {
    throw new Error("MongoDB connected without an active database.");
  }

  const collections = await database
    .listCollections({ name: INITIAL_COLLECTION }, { nameOnly: true })
    .toArray();

  if (collections.length === 0) {
    await database.createCollection(INITIAL_COLLECTION);
  }

  console.log(`MongoDB connected successfully to ${mongoose.connection.name}.`);
}

module.exports = connectDatabase;

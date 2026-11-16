const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required."],
      trim: true,
      minlength: [2, "Product name must be at least 2 characters long."],
      maxlength: [100, "Product name cannot exceed 100 characters."]
    },
    category: {
      type: String,
      required: [true, "Product category is required."],
      trim: true,
      minlength: [2, "Product category must be at least 2 characters long."],
      maxlength: [100, "Product category cannot exceed 100 characters."]
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, "Quantity cannot be negative."],
      validate: {
        validator: Number.isInteger,
        message: "Quantity must be a whole number."
      }
    },
    price: {
      type: Number,
      required: [true, "Product price is required."],
      min: [0, "Price cannot be negative."]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema, "products");

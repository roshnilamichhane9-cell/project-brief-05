const mongoose = require("mongoose");
const Product = require("../models/Product");

const PRODUCT_FIELDS = ["name", "category", "quantity", "price"];

function getProductFields(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }

  const product = {};
  for (const field of PRODUCT_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      product[field] = body[field];
    }
  }

  return Object.keys(product).length > 0 ? product : null;
}

function sendOperationError(res, error, operation) {
  console.error(`Product ${operation} failed:`, error);

  const isInvalidData =
    error &&
    (error.name === "ValidationError" || error.name === "CastError");

  return res.status(isInvalidData ? 400 : 500).json({
    success: false,
    message: isInvalidData ? error.message : `Failed to ${operation} product.`
  });
}

function validateId(id, res) {
  if (mongoose.isObjectIdOrHexString(id)) {
    return true;
  }

  res.status(400).json({
    success: false,
    message: "Product ID must be a valid MongoDB ObjectId."
  });
  return false;
}

function respondNotFound(res) {
  return res.status(404).json({
    success: false,
    message: "Product not found."
  });
}

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    return res.status(200).json({ success: true, data: products });
  } catch (error) {
    return sendOperationError(res, error, "retrieve");
  }
};

exports.getProductById = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return respondNotFound(res);
    }

    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return sendOperationError(res, error, "retrieve");
  }
};

exports.createProduct = async (req, res) => {
  const productFields = getProductFields(req.body);
  if (!productFields) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one valid product field."
    });
  }

  try {
    const product = await Product.create(productFields);
    return res.status(201).json({
      success: true,
      message: "Product created successfully.",
      data: product
    });
  } catch (error) {
    return sendOperationError(res, error, "create");
  }
};

exports.updateProduct = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  const productFields = getProductFields(req.body);
  if (!productFields) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one valid product field to update."
    });
  }

  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      productFields,
      { new: true, runValidators: true }
    );
    if (!product) {
      return respondNotFound(res);
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully.",
      data: product
    });
  } catch (error) {
    return sendOperationError(res, error, "update");
  }
};

exports.deleteProduct = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return respondNotFound(res);
    }

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully.",
      data: product
    });
  } catch (error) {
    return sendOperationError(res, error, "delete");
  }
};

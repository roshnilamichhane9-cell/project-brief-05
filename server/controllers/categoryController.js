const mongoose = require("mongoose");
const Category = require("../models/Category");

const CATEGORY_FIELDS = ["name", "description", "isActive"];

function getCategoryFields(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }

  const category = {};
  for (const field of CATEGORY_FIELDS) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      category[field] = body[field];
    }
  }

  return Object.keys(category).length > 0 ? category : null;
}

function sendOperationError(res, error, operation) {
  console.error(`Category ${operation} failed:`, error);

  if (error && error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "A category with this name already exists."
    });
  }

  const isInvalidData =
    error &&
    (error.name === "ValidationError" || error.name === "CastError");

  return res.status(isInvalidData ? 400 : 500).json({
    success: false,
    message: isInvalidData ? error.message : `Failed to ${operation} category.`
  });
}

function validateId(id, res) {
  if (mongoose.isObjectIdOrHexString(id)) {
    return true;
  }

  res.status(400).json({
    success: false,
    message: "Category ID must be a valid MongoDB ObjectId."
  });
  return false;
}

function respondNotFound(res) {
  return res.status(404).json({
    success: false,
    message: "Category not found."
  });
}

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    return res.status(200).json({ success: true, data: categories });
  } catch (error) {
    return sendOperationError(res, error, "retrieve");
  }
};

exports.getCategoryById = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return respondNotFound(res);
    }

    return res.status(200).json({ success: true, data: category });
  } catch (error) {
    return sendOperationError(res, error, "retrieve");
  }
};

exports.createCategory = async (req, res) => {
  const categoryFields = getCategoryFields(req.body);
  if (!categoryFields) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one valid category field."
    });
  }

  try {
    const category = await Category.create(categoryFields);
    return res.status(201).json({
      success: true,
      message: "Category created successfully.",
      data: category
    });
  } catch (error) {
    return sendOperationError(res, error, "create");
  }
};

exports.updateCategory = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  const categoryFields = getCategoryFields(req.body);
  if (!categoryFields) {
    return res.status(400).json({
      success: false,
      message: "Provide at least one valid category field to update."
    });
  }

  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      categoryFields,
      { returnDocument: "after", runValidators: true }
    );
    if (!category) {
      return respondNotFound(res);
    }

    return res.status(200).json({
      success: true,
      message: "Category updated successfully.",
      data: category
    });
  } catch (error) {
    return sendOperationError(res, error, "update");
  }
};

exports.deleteCategory = async (req, res) => {
  if (!validateId(req.params.id, res)) {
    return;
  }

  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) {
      return respondNotFound(res);
    }

    return res.status(200).json({
      success: true,
      message: "Category deleted successfully.",
      data: category
    });
  } catch (error) {
    return sendOperationError(res, error, "delete");
  }
};

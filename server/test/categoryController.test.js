const assert = require("node:assert/strict");
const test = require("node:test");
const Category = require("../models/Category");
const categoryController = require("../controllers/categoryController");

const categoryId = "507f1f77bcf86cd799439011";

function createResponse() {
  return {
    statusCode: null,
    body: null,
    status(code) {
      this.statusCode = code;
      return this;
    },
    json(body) {
      this.body = body;
      return this;
    }
  };
}

function stubCategoryMethods(stubs) {
  const originals = {};
  for (const [method, implementation] of Object.entries(stubs)) {
    originals[method] = Category[method];
    Category[method] = implementation;
  }

  return () => {
    for (const [method, implementation] of Object.entries(originals)) {
      Category[method] = implementation;
    }
  };
}

test("Category controller performs CRUD operations through the model", async () => {
  const storedCategory = {
    _id: categoryId,
    name: "Electronics",
    description: "Devices",
    isActive: true
  };
  let createArguments;
  let updateArguments;
  const restore = stubCategoryMethods({
    find: async () => [storedCategory],
    findById: async () => storedCategory,
    create: async (category) => {
      createArguments = category;
      return storedCategory;
    },
    findByIdAndUpdate: async (...args) => {
      updateArguments = args;
      return storedCategory;
    },
    findByIdAndDelete: async () => storedCategory
  });

  try {
    const listResponse = createResponse();
    await categoryController.getCategories({}, listResponse);
    assert.equal(listResponse.statusCode, 200);
    assert.deepEqual(listResponse.body.data, [storedCategory]);

    const itemResponse = createResponse();
    await categoryController.getCategoryById(
      { params: { id: categoryId } },
      itemResponse
    );
    assert.equal(itemResponse.statusCode, 200);
    assert.deepEqual(itemResponse.body.data, storedCategory);

    const createResponseData = createResponse();
    await categoryController.createCategory(
      {
        body: {
          name: "Electronics",
          description: "Devices",
          isActive: true,
          _id: "untrusted-id"
        }
      },
      createResponseData
    );
    assert.equal(createResponseData.statusCode, 201);
    assert.equal(createArguments._id, undefined);
    assert.deepEqual(createArguments, {
      name: "Electronics",
      description: "Devices",
      isActive: true
    });

    const updateResponse = createResponse();
    await categoryController.updateCategory(
      {
        params: { id: categoryId },
        body: { isActive: false }
      },
      updateResponse
    );
    assert.equal(updateResponse.statusCode, 200);
    assert.deepEqual(updateArguments, [
      categoryId,
      { isActive: false },
      { returnDocument: "after", runValidators: true }
    ]);

    const deleteResponse = createResponse();
    await categoryController.deleteCategory(
      { params: { id: categoryId } },
      deleteResponse
    );
    assert.equal(deleteResponse.statusCode, 200);
    assert.equal(deleteResponse.body.success, true);
  } finally {
    restore();
  }
});

test("Category controller handles invalid IDs, duplicates, missing records, and failures", async () => {
  const duplicateError = new Error("duplicate category");
  duplicateError.code = 11000;
  const restore = stubCategoryMethods({
    find: async () => {
      throw new Error("database unavailable");
    },
    findById: async () => null,
    create: async () => {
      throw duplicateError;
    }
  });
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const invalidIdResponse = createResponse();
    await categoryController.getCategoryById(
      { params: { id: "invalid-id" } },
      invalidIdResponse
    );
    assert.equal(invalidIdResponse.statusCode, 400);

    const notFoundResponse = createResponse();
    await categoryController.getCategoryById(
      { params: { id: categoryId } },
      notFoundResponse
    );
    assert.equal(notFoundResponse.statusCode, 404);

    const duplicateResponse = createResponse();
    await categoryController.createCategory(
      { body: { name: "Electronics" } },
      duplicateResponse
    );
    assert.equal(duplicateResponse.statusCode, 409);

    const invalidBodyResponse = createResponse();
    await categoryController.createCategory(
      { body: { _id: "untrusted-id" } },
      invalidBodyResponse
    );
    assert.equal(invalidBodyResponse.statusCode, 400);

    const databaseErrorResponse = createResponse();
    await categoryController.getCategories({}, databaseErrorResponse);
    assert.equal(databaseErrorResponse.statusCode, 500);
  } finally {
    restore();
    console.error = originalConsoleError;
  }
});

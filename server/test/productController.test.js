const assert = require("node:assert/strict");
const test = require("node:test");
const Product = require("../models/Product");
const productController = require("../controllers/productController");

const productId = "507f1f77bcf86cd799439011";

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

function stubProductMethods(stubs) {
  const originals = {};
  for (const [method, implementation] of Object.entries(stubs)) {
    originals[method] = Product[method];
    Product[method] = implementation;
  }

  return () => {
    for (const [method, implementation] of Object.entries(originals)) {
      Product[method] = implementation;
    }
  };
}

test("Product controller performs CRUD operations through the model", async () => {
  const storedProduct = {
    _id: productId,
    name: "Laptop",
    category: "Electronics",
    quantity: 5,
    price: 60000
  };
  let updateArguments;
  let createArguments;

  const restore = stubProductMethods({
    find: async () => [storedProduct],
    findById: async () => storedProduct,
    create: async (product) => {
      createArguments = product;
      return storedProduct;
    },
    findByIdAndUpdate: async (...args) => {
      updateArguments = args;
      return storedProduct;
    },
    findByIdAndDelete: async () => storedProduct
  });

  try {
    const listResponse = createResponse();
    await productController.getProducts({}, listResponse);
    assert.equal(listResponse.statusCode, 200);
    assert.deepEqual(listResponse.body.data, [storedProduct]);

    const itemResponse = createResponse();
    await productController.getProductById(
      { params: { id: productId } },
      itemResponse
    );
    assert.equal(itemResponse.statusCode, 200);
    assert.deepEqual(itemResponse.body.data, storedProduct);

    const createResponseData = createResponse();
    await productController.createProduct(
      {
        body: {
          name: "Laptop",
          category: "Electronics",
          quantity: 5,
          price: 60000,
          _id: "untrusted-id"
        }
      },
      createResponseData
    );
    assert.equal(createResponseData.statusCode, 201);
    assert.equal(createArguments._id, undefined);

    const updateResponse = createResponse();
    await productController.updateProduct(
      {
        params: { id: productId },
        body: { quantity: 8 }
      },
      updateResponse
    );
    assert.equal(updateResponse.statusCode, 200);
    assert.deepEqual(updateArguments, [
      productId,
      { quantity: 8 },
      { new: true, runValidators: true }
    ]);

    const deleteResponse = createResponse();
    await productController.deleteProduct(
      { params: { id: productId } },
      deleteResponse
    );
    assert.equal(deleteResponse.statusCode, 200);
    assert.equal(deleteResponse.body.success, true);
  } finally {
    restore();
  }
});

test("Product controller returns client and server errors with the right status", async () => {
  const restore = stubProductMethods({
    findById: async () => null,
    find: async () => {
      throw new Error("database unavailable");
    },
    create: async () => {
      const error = new Error("Product name is required.");
      error.name = "ValidationError";
      throw error;
    }
  });
  const originalConsoleError = console.error;
  console.error = () => {};

  try {
    const invalidIdResponse = createResponse();
    await productController.getProductById(
      { params: { id: "invalid-id" } },
      invalidIdResponse
    );
    assert.equal(invalidIdResponse.statusCode, 400);

    const notFoundResponse = createResponse();
    await productController.getProductById(
      { params: { id: productId } },
      notFoundResponse
    );
    assert.equal(notFoundResponse.statusCode, 404);

    const invalidDataResponse = createResponse();
    await productController.createProduct(
      { body: { name: "Laptop" } },
      invalidDataResponse
    );
    assert.equal(invalidDataResponse.statusCode, 400);

    const databaseErrorResponse = createResponse();
    await productController.getProducts({}, databaseErrorResponse);
    assert.equal(databaseErrorResponse.statusCode, 500);
  } finally {
    restore();
    console.error = originalConsoleError;
  }
});

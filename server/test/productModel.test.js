const assert = require("node:assert/strict");
const test = require("node:test");
const Product = require("../models/Product");

test("Product model uses the products collection and applies defaults", async () => {
  const product = new Product({
    name: " Laptop ",
    category: " Electronics ",
    price: 60000
  });

  assert.equal(Product.collection.name, "products");
  assert.equal(product.name, "Laptop");
  assert.equal(product.category, "Electronics");
  assert.equal(product.quantity, 0);
  await product.validate();
});

test("Product model requires core fields and rejects invalid values", async () => {
  await assert.rejects(new Product().validate(), (error) => {
    assert.ok(error.errors.name);
    assert.ok(error.errors.category);
    assert.ok(error.errors.price);
    return true;
  });

  const invalidProduct = new Product({
    name: "X",
    category: "Accessories",
    quantity: 1.5,
    price: -1
  });

  await assert.rejects(invalidProduct.validate(), (error) => {
    assert.ok(error.errors.name);
    assert.ok(error.errors.quantity);
    assert.ok(error.errors.price);
    return true;
  });
});

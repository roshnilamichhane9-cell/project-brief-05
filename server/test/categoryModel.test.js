const assert = require("node:assert/strict");
const test = require("node:test");
const Category = require("../models/Category");

test("Category model uses its own collection and applies defaults", async () => {
  const category = new Category({
    name: " Electronics ",
    description: " Devices and accessories "
  });

  assert.equal(Category.collection.name, "categories");
  assert.equal(category.name, "Electronics");
  assert.equal(category.description, "Devices and accessories");
  assert.equal(category.isActive, true);
  assert.equal(Category.schema.path("name").options.unique, true);
  await category.validate();
});

test("Category model requires a valid name and enforces field limits", async () => {
  await assert.rejects(new Category().validate(), (error) => {
    assert.ok(error.errors.name);
    return true;
  });

  const invalidCategory = new Category({
    name: "X",
    description: "d".repeat(251)
  });

  await assert.rejects(invalidCategory.validate(), (error) => {
    assert.ok(error.errors.name);
    assert.ok(error.errors.description);
    return true;
  });
});

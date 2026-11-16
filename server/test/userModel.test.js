const assert = require("node:assert/strict");
const test = require("node:test");
const User = require("../models/User");

test("User model uses the users collection and normalizes email", async () => {
  const user = new User({
    name: " Roshni Lamichhane ",
    email: " Roshni@Example.com ",
    password: "student-password"
  });

  assert.equal(User.collection.name, "users");
  assert.equal(user.name, "Roshni Lamichhane");
  assert.equal(user.email, "roshni@example.com");
  assert.equal(User.schema.path("email").options.unique, true);
  assert.equal(User.schema.path("password").options.select, false);
  await user.validate();
});

test("User model requires valid name, email, and password values", async () => {
  await assert.rejects(new User().validate(), (error) => {
    assert.ok(error.errors.name);
    assert.ok(error.errors.email);
    assert.ok(error.errors.password);
    return true;
  });

  const invalidUser = new User({
    name: "A",
    email: "not-an-email",
    password: "short"
  });

  await assert.rejects(invalidUser.validate(), (error) => {
    assert.ok(error.errors.name);
    assert.ok(error.errors.email);
    assert.ok(error.errors.password);
    return true;
  });
});

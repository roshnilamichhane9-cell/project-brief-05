const assert = require("node:assert/strict");
const test = require("node:test");
const app = require("../app");

test("Category routes are mounted at /api/categories", async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  try {
    const { port } = server.address();
    const response = await fetch(
      `http://127.0.0.1:${port}/api/categories/not-an-object-id`
    );
    const body = await response.json();

    assert.equal(response.status, 400);
    assert.match(body.message, /valid MongoDB ObjectId/);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

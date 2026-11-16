const assert = require("node:assert/strict");
const test = require("node:test");
const app = require("../app");

test("Authentication registration and login routes are mounted", async () => {
  const server = app.listen(0);
  await new Promise((resolve) => server.once("listening", resolve));

  try {
    const { port } = server.address();
    const baseUrl = `http://127.0.0.1:${port}/api/auth`;
    const [registerResponse, loginResponse] = await Promise.all([
      fetch(`${baseUrl}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}"
      }),
      fetch(`${baseUrl}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: "{}"
      })
    ]);

    assert.equal(registerResponse.status, 400);
    assert.equal(loginResponse.status, 400);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }
});

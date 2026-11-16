const assert = require("node:assert/strict");
const test = require("node:test");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const authController = require("../controllers/authController");

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

function stubUserMethods(stubs) {
  const originals = {};
  for (const [method, implementation] of Object.entries(stubs)) {
    originals[method] = User[method];
    User[method] = implementation;
  }

  return () => {
    for (const [method, implementation] of Object.entries(originals)) {
      User[method] = implementation;
    }
  };
}

test("Registration hashes passwords and returns only public user data", async () => {
  const originalPassword = "inventory-password";
  let savedUser;
  let queriedEmail;
  const restore = stubUserMethods({
    findOne: async (query) => {
      queriedEmail = query.email;
      return null;
    },
    create: async (user) => {
      savedUser = {
        ...user,
        _id: "507f1f77bcf86cd799439011",
        createdAt: new Date("2026-01-01T00:00:00.000Z"),
        updatedAt: new Date("2026-01-01T00:00:00.000Z")
      };
      return savedUser;
    }
  });

  try {
    const response = createResponse();
    await authController.registerUser(
      {
        body: {
          name: " Roshni Lamichhane ",
          email: " Roshni@Example.com ",
          password: originalPassword
        }
      },
      response
    );

    assert.equal(response.statusCode, 201);
    assert.equal(queriedEmail, "roshni@example.com");
    assert.equal(savedUser.name, "Roshni Lamichhane");
    assert.equal(savedUser.email, "roshni@example.com");
    assert.notEqual(savedUser.password, originalPassword);
    assert.equal(await bcrypt.compare(originalPassword, savedUser.password), true);
    assert.equal(response.body.data.password, undefined);
  } finally {
    restore();
  }
});

test("Login verifies the stored hash and returns the same error for bad credentials", async () => {
  const password = "inventory-password";
  const storedUser = {
    _id: "507f1f77bcf86cd799439011",
    name: "Roshni",
    email: "roshni@example.com",
    password: await bcrypt.hash(password, 4)
  };
  let selectedFields;
  let queriedEmail;
  const restore = stubUserMethods({
    findOne: (query) => {
      queriedEmail = query.email;
      return {
        select: async (fields) => {
          selectedFields = fields;
          return storedUser;
        }
      };
    }
  });

  try {
    const successResponse = createResponse();
    await authController.loginUser(
      { body: { email: " Roshni@Example.com ", password } },
      successResponse
    );
    assert.equal(successResponse.statusCode, 200);
    assert.equal(queriedEmail, "roshni@example.com");
    assert.equal(selectedFields, "+password");
    assert.equal(successResponse.body.data.password, undefined);

    const wrongPasswordResponse = createResponse();
    await authController.loginUser(
      { body: { email: "roshni@example.com", password: "incorrect-password" } },
      wrongPasswordResponse
    );
    assert.equal(wrongPasswordResponse.statusCode, 401);
    assert.equal(wrongPasswordResponse.body.message, "Invalid email or password.");

    const restoreMissingUser = stubUserMethods({
      findOne: () => ({ select: async () => null })
    });
    try {
      const missingUserResponse = createResponse();
      await authController.loginUser(
        { body: { email: "unknown@example.com", password } },
        missingUserResponse
      );
      assert.equal(missingUserResponse.statusCode, 401);
      assert.equal(
        missingUserResponse.body.message,
        wrongPasswordResponse.body.message
      );
    } finally {
      restoreMissingUser();
    }
  } finally {
    restore();
  }
});

test("Authentication rejects invalid input, duplicates, and database failures", async () => {
  const originalConsoleError = console.error;
  console.error = () => {};
  const duplicateError = new Error("duplicate email");
  duplicateError.code = 11000;
  const restore = stubUserMethods({
    findOne: async () => null,
    create: async () => {
      throw duplicateError;
    }
  });

  try {
    const invalidRegistrationResponse = createResponse();
    await authController.registerUser(
      {
        body: {
          name: "R",
          email: "bad-email",
          password: "short"
        }
      },
      invalidRegistrationResponse
    );
    assert.equal(invalidRegistrationResponse.statusCode, 400);

    const duplicateResponse = createResponse();
    await authController.registerUser(
      {
        body: {
          name: "Roshni",
          email: "roshni@example.com",
          password: "inventory-password"
        }
      },
      duplicateResponse
    );
    assert.equal(duplicateResponse.statusCode, 409);

    const invalidLoginResponse = createResponse();
    await authController.loginUser({ body: {} }, invalidLoginResponse);
    assert.equal(invalidLoginResponse.statusCode, 400);

    const restoreFindFailure = stubUserMethods({
      findOne: async () => {
        throw new Error("database unavailable");
      }
    });
    try {
      const serverErrorResponse = createResponse();
      await authController.registerUser(
        {
          body: {
            name: "Roshni",
            email: "roshni@example.com",
            password: "inventory-password"
          }
        },
        serverErrorResponse
      );
      assert.equal(serverErrorResponse.statusCode, 500);
    } finally {
      restoreFindFailure();
    }
  } finally {
    restore();
    console.error = originalConsoleError;
  }
});

const bcrypt = require("bcryptjs");
const User = require("../models/User");

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PASSWORD_MIN_LENGTH = 8;
const BCRYPT_ROUNDS = 12;

function getCredentials(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) {
    return null;
  }
  return body;
}

function getPublicUser(user) {
  return {
    id: String(user._id),
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
    updatedAt: user.updatedAt
  };
}

function sendInvalidCredentials(res) {
  return res.status(401).json({
    success: false,
    message: "Invalid email or password."
  });
}

function sendOperationError(res, error, operation) {
  if (error && error.code === 11000) {
    return res.status(409).json({
      success: false,
      message: "An account with this email already exists."
    });
  }

  if (error && error.name === "ValidationError") {
    return res.status(400).json({
      success: false,
      message: "Registration data is invalid."
    });
  }

  console.error(`Authentication ${operation} failed:`, error);
  return res.status(500).json({
    success: false,
    message: `Unable to ${operation}. Please try again later.`
  });
}

exports.registerUser = async (req, res) => {
  const credentials = getCredentials(req.body);
  if (!credentials) {
    return res.status(400).json({
      success: false,
      message: "Provide a name, valid email, and password."
    });
  }

  const name =
    typeof credentials.name === "string" ? credentials.name.trim() : "";
  const email =
    typeof credentials.email === "string"
      ? credentials.email.trim().toLowerCase()
      : "";
  const password = credentials.password;

  if (name.length < 2 || name.length > 100) {
    return res.status(400).json({
      success: false,
      message: "Name must be between 2 and 100 characters."
    });
  }
  if (email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return res.status(400).json({
      success: false,
      message: "Enter a valid email address."
    });
  }
  if (typeof password !== "string" || password.length < PASSWORD_MIN_LENGTH) {
    return res.status(400).json({
      success: false,
      message: `Password must be at least ${PASSWORD_MIN_LENGTH} characters long.`
    });
  }
  if (bcrypt.truncates(password)) {
    return res.status(400).json({
      success: false,
      message: "Password is too long to securely hash. Use 72 bytes or fewer."
    });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "An account with this email already exists."
      });
    }

    const hashedPassword = await bcrypt.hash(password, BCRYPT_ROUNDS);
    const user = await User.create({ name, email, password: hashedPassword });

    return res.status(201).json({
      success: true,
      message: "Account created successfully.",
      data: getPublicUser(user)
    });
  } catch (error) {
    return sendOperationError(res, error, "create account");
  }
};

exports.loginUser = async (req, res) => {
  const credentials = getCredentials(req.body);
  const email =
    credentials && typeof credentials.email === "string"
      ? credentials.email.trim().toLowerCase()
      : "";
  const password = credentials && credentials.password;

  if (!EMAIL_PATTERN.test(email) || typeof password !== "string" || !password) {
    return res.status(400).json({
      success: false,
      message: "Provide a valid email and password."
    });
  }

  try {
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return sendInvalidCredentials(res);
    }

    return res.status(200).json({
      success: true,
      message: "Login successful.",
      data: getPublicUser(user)
    });
  } catch (error) {
    return sendOperationError(res, error, "log in");
  }
};

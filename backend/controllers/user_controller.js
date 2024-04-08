const { v4: uuidv4 } = require("uuid");
const HttpError = require("../models/http-error");
const { validationResult } = require("express-validator");
const DUMMY_USER = [
  {
    id: "u1",
    name: "sagar jadhav",
    email: "sagar@gmail.com",
    password: "sagar",
  },
];

const getUsers = (req, res, next) => {
  res.json({ users: DUMMY_USER });
};
const signup = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Optional: Transform the errors into a more friendly format
    const extractedErrors = errors
      .array()
      .map((err) => ({ [err.param]: err.msg }));
    return next(
      new HttpError(
        `Invalid input data. Details: ${JSON.stringify(extractedErrors)}`,
        422
      )
    );
  }
  const { name, email, password } = req.body;
  const hasUser = DUMMY_USER.find((u) => u.email === email);
  const existingUser = DUMMY_USER.find((u) => u.email === email);
  if (existingUser) {
    return next(
      new HttpError("User exists already, please login instead.", 422)
    );
  }
  const createdUser = {
    id: uuidv4(),
    name,
    email,
    password,
  };
  DUMMY_USER.push(createdUser);
  res.status(201).json({ user: createdUser });
};
const login = (req, res, next) => {
  const { email, password } = req.body;
  const identifierUSer = DUMMY_USER.find((u) => u.email === email);
  if (!identifierUSer || identifierUSer.password !== password) {
    return new HttpError("Could not find user", 401);
  }
  res.json({ message: "Logged in" });
};

module.exports = {
  getUsers,
  signup,
  login,
};

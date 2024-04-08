const express = require("express");
const router = express.Router();
const { check, body } = require("express-validator");

const { login, signup, getUsers } = require("../controllers/user_controller");

router.get("/", getUsers);
router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required."),
    body("email")
      .isEmail()
      .normalizeEmail()
      .withMessage("Email must be a valid email address."),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long."),
  ],
  signup
);
router.post("/login", login);
module.exports = router;

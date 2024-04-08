const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const {
  getPlaceByID,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  removePlaceById,
} = require("../controllers/places_controller");

router.get("/:placeId", getPlaceByID);

router.get("/user/:userId", getPlacesByUserId);
router.post(
  "/",
  [
    // Validation rules here
    body("title").not().isEmpty().withMessage("Title must not be empty."),
    body("address").not().isEmpty().withMessage("Address must not be empty."),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description must be at least 5 characters."),
    body("creator").not().isEmpty().withMessage("Creator must not be empty."),
  ],
  createPlace
);
router.patch(
  "/:placeId",
  [
    body("title")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Title, if provided, must not be empty."),
    body("address")
      .optional()
      .not()
      .isEmpty()
      .withMessage("Address, if provided, must not be empty."),
    body("description")
      .optional()
      .isLength({ min: 5 })
      .withMessage("Description, if provided, must be at least 5 characters."),
  ],
  updatePlaceById
);
router.delete("/:placeId", removePlaceById);
module.exports = router;

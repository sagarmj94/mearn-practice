const HttpError = require("../models/http-error");
const uuid = require("uuid");
const { validationResult } = require("express-validator");
let DUMMY_PLACES = [
  {
    id: "p1",
    title: "Empire State Building",
    description: "One of the most famous sky scrapers in the world",
    location: {
      lat: 40.7484474,
      lng: -73.9871516,
    },
    address: "20 W 34th St, New York, NY 10001",
    creator: "u1",
  },
];

// GET PLACE BY ID

const getPlaceByID = (req, res, next) => {
  const placeId = req.params.placeId;

  const place = DUMMY_PLACES.find((p) => {
    return p.id === placeId;
  });
  if (!place) {
    throw new HttpError("Could not find a place for the provided id.", 404);
  }
  res.json({ place });
};

// GET PLACES BY USER ID

const getPlacesByUserId = (req, res, next) => {
  const placeId = req.params.userId;
  const places = DUMMY_PLACES.filter((p) => {
    return p.creator === placeId;
  });
  if (!places || places.length === 0) {
    return next(
      new HttpError("Could not find a places for the provided user id.", 404)
    );
  }
  res.json({ places });
};

// CREATE PLACE BY ID

const createPlace = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Creating a detailed errors object
    const detailedErrors = errors.array().reduce((acc, error) => {
      acc[error.param] = error.msg;
      return acc;
    }, {});

    return next(
      new HttpError(
        `Invalid inputs passed, please check your data. Errors: ${JSON.stringify(
          detailedErrors
        )}`,
        422
      )
    );
  }
  const { title, description, coordinates, address, creator } = req.body;
  const createdPlace = {
    id: uuid.v4(),
    title,
    description,
    location: coordinates,
    address,
    creator,
  };

  DUMMY_PLACES.push(createdPlace);
  res.status(201).json({ place: createdPlace });
};

// UPDATE PLACE BY ID

const updatePlaceById = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    // Construct a message detailing each validation error
    const errorMessage = errors
      .array()
      .map((error) => `${error.param}: ${error.msg}`)
      .join(", ");

    // Return an error response with the detailed message
    return next(
      new HttpError(
        `Invalid inputs passed, please check your data. Details: ${errorMessage}`,
        422
      )
    );
  }

  const placeId = req.params.placeId;
  const { title, description } = req.body;
  const placeIndex = DUMMY_PLACES.findIndex((place) => place.id === placeId);
  if (placeIndex === -1) {
    return next(
      new HttpError("Could not find a place for the provided id.", 404)
    );
  }

  // Assuming title and description are optional for the patch
  const updatedPlace = { ...DUMMY_PLACES[placeIndex] };
  if (title) updatedPlace.title = title;
  if (description) updatedPlace.description = description;

  DUMMY_PLACES[placeIndex] = updatedPlace;

  res.status(200).json({ place: updatedPlace });
};

//REMOVE PLACE BY ID Method
const removePlaceById = (req, res, next) => {
  const placeId = req.params.placeId;

  const removedPlaceIndex = DUMMY_PLACES.findIndex((p) => p.id === placeId);

  if (removedPlaceIndex === -1) {
    return next(
      new HttpError("Could not find place for the provided id.", 404)
    );
  }

  const removedPlace = DUMMY_PLACES.splice(removedPlaceIndex, 1);

  res.status(200).json({ message: "Place deleted", place: removedPlace });
};

// post method to create createPlace
module.exports = {
  getPlaceByID,
  getPlacesByUserId,
  createPlace,
  updatePlaceById,
  removePlaceById,
};

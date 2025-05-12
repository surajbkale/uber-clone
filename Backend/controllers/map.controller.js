// const mapService = require("../services/maps.service");
// const { validationResult } = require("express-validator");

// module.exports.getCoordinates = async (req, res, next) => {
//   const errors = validationResult(req);
//   if (!errors.isEmpty()) {
//     return res.status(400).json({ errors: errors.array() });
//   }

//   const { address } = req.query;

//   try {
//     const coordinates = await mapService.getAddressCoordinate(address);
//     res.status(200).json(coordinates);
//   } catch (error) {
//     res.status(404).json({ message: "Coordinates not found" });
//   }
// };

const mapService = require("../services/maps.service");
const { validationResult } = require("express-validator");

module.exports.getCoordinates = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { address } = req.query;

  try {
    const coordinates = await mapService.getAddressCoordinate(address);

    return res.status(200).json({
      success: true,
      data: coordinates,
    });
  } catch (error) {
    console.error(error);
    return res.status(404).json({
      success: false,
      message: "Coordinates not found",
    });
  }
};

module.exports.getDistanceTime = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { origin, destination } = req.query;

  try {
    const result = await mapService.getDistanceTime(origin, destination);
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch distance & time" });
  }
};

module.exports.getAutocompleteSuggestions = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { input } = req.query;

  try {
    const suggestions = await mapService.getPlaceSuggestions(input);
    res.status(200).json({ suggestions });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch suggestions", error });
  }
};

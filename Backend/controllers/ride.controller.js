const rideService = require("../services/ride.service");
const mapService = require("../services/maps.service"); // your OpenRouteService wrapper
const { validationResult } = require("express-validator");
const { sendMessageToSocketId } = require("../socket");

module.exports.createRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination, vehicleType } = req.body;

  try {
    const { ride, fare, distance, duration } = await rideService.createRide({
      user: req.user._id,
      pickup,
      destination,
      vehicleType,
    });

    // Fetch pickup coordinates using OpenRouteService
    const pickupCoordinates = await mapService.getAddressCoordinate(pickup);
    console.log("Pickup Coordinates:", pickupCoordinates);

    // Find captains within a 2km radius from pickup point
    const captainsInRadius = await mapService.getCaptainsInTheRadius(
      pickupCoordinates.lat, // note: ensure your mapService returns lat/lng keys
      pickupCoordinates.lng,
      2 // radius in KM
    );

    console.log("Captains in radius:", captainsInRadius);

    // Send ride request to captains in radius via socket
    captainsInRadius.forEach((captain) => {
      sendMessageToSocketId(captain.socketId, {
        event: "new-ride",
        data: ride,
      });
    });

    // Respond to client
    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: {
        user: ride.user,
        pickup: ride.pickup,
        destination: ride.destination,
        fare: fare.toFixed(2),
        status: "pending",
        otp: ride.otp,
        _id: ride._id,
        distance,
        duration,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

module.exports.getFare = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { pickup, destination } = req.query;

  try {
    const fare = await rideService.getFare(pickup, destination);
    return res.status(200).json(fare);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

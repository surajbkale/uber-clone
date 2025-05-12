const rideService = require("../services/ride.service");
const { validationResult } = require("express-validator");

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

    // Format the response correctly by including fare directly on ride object
    return res.status(201).json({
      success: true,
      message: "Ride created successfully",
      data: {
        user: ride.user,
        pickup: ride.pickup,
        destination: ride.destination,
        fare: fare.toFixed(2),  // Round the fare to 2 decimal places
        status: "pending",      // Default status
        otp: ride.otp,
        _id: ride._id,
      },
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: err.message });
  }
};

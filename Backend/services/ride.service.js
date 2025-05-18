const captainModel = require("../models/captain.model");
const rideModel = require("../models/ride.model");
const mapService = require("./maps.service");
const crypto = require("crypto");

async function getFare(pickup, destination) {
  if (!pickup || !destination) {
    throw new Error("Pickup and destination are required");
  }

  const distanceTime = await mapService.getDistanceTime(pickup, destination);
  console.log("🚀 distanceTime response → ", distanceTime);

  const distanceInKm = parseFloat(distanceTime.distance.replace(" km", ""));
  const durationInMin = parseFloat(distanceTime.duration.replace(" min", ""));

  const baseFare = { auto: 25, car: 40, moto: 18 };
  const perKmRate = { auto: 5, car: 8, moto: 3 };
  const perMinuteRate = { auto: 1.8, car: 2.5, moto: 1.5 };

  const fare = {
    auto: Math.round(
      baseFare.auto +
        distanceInKm * perKmRate.auto +
        durationInMin * perMinuteRate.auto
    ),
    car: Math.round(
      baseFare.car +
        distanceInKm * perKmRate.car +
        durationInMin * perMinuteRate.car
    ),
    moto: Math.round(
      baseFare.moto +
        distanceInKm * perKmRate.moto +
        durationInMin * perMinuteRate.moto
    ),
  };

  return {
    fare,
    distance: distanceTime.distance,
    duration: distanceTime.duration,
  };
}

function getOtp(num) {
  const otp = crypto
    .randomInt(Math.pow(10, num - 1), Math.pow(10, num))
    .toString();
  return otp;
}

module.exports.createRide = async ({
  user,
  pickup,
  destination,
  vehicleType,
}) => {
  if (!user || !pickup || !destination || !vehicleType) {
    throw new Error("All fields are required");
  }

  const { fare, distance, duration } = await getFare(pickup, destination);
  console.log("🚀 Fare Calculated:", fare);

  const otp = getOtp(6);

  const ride = await rideModel.create({
    user,
    pickup,
    destination,
    vehicleType,
    fare: fare[vehicleType],
    otp,
  });

  // Return formatted response
  return {
    ride,
    fare: fare[vehicleType],
    distance,
    duration,
  };
};

module.exports.confirmRide = async ({ rideId, captainModel }) => {
  if (!rideId) {
    throw new Error("Ride id is required");
  }

  await rideModel.findOneAndUpdate(
    {
      _id: rideId,
    },
    {
      status: "accepted",
      captain: captain._id,
    }
  );

  const ride = await rideModel
    .findOne({
      _id: rideId,
    })
    .populate("user")
    .populate("captain")
    .select("+otp");

  if (!ride) {
    throw new Error("Ride not found");
  }

  return ride;
};

module.exports.getFare = getFare;

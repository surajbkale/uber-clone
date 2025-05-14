const axios = require("axios");

// Helper: Get coordinates from address (using OpenCage API or OpenStreetMap Nominatim)
async function getCoordinates(address) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    address
  )}`;

  const response = await axios.get(url);
  if (response.data.length === 0) {
    throw new Error(`Coordinates not found for ${address}`);
  }

  const { lat, lon } = response.data[0];
  return { lat, lon };
}

module.exports.getDistanceTime = async (origin, destination) => {
  const apiKey = process.env.ORS_API_KEY;

  // Get coordinates for origin & destination
  const originCoords = await getCoordinates(origin);
  const destinationCoords = await getCoordinates(destination);

  const url = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=${apiKey}&start=${originCoords.lon},${originCoords.lat}&end=${destinationCoords.lon},${destinationCoords.lat}`;

  const response = await axios.get(url);
  const route = response.data.features[0].properties.segments[0];

  return {
    distance: `${(route.distance / 1000).toFixed(2)} km`,
    duration: `${(route.duration / 60).toFixed(2)} min`,
  };
};

module.exports.getPlaceSuggestions = async (text) => {
  const url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
    text
  )}&addressdetails=1&limit=5`;

  const response = await axios.get(url);

  return response.data.map((place) => ({
    display_name: place.display_name,
    // lat: place.lat,
    // lon: place.lon,
  }));
};

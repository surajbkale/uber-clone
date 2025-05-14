import React from "react";

const LocationSearchPanel = ({
  suggestions,
  setVehiclePanel,
  setPanelOpen,
  setPickup,
  setDestination,
  activeField,
}) => {
  const handleSuggestionClick = (suggestion) => {
    if (activeField === "pickup") {
      setPickup(suggestion.display_name);
    } else if (activeField === "destination") {
      setDestination(suggestion.display_name);
    }

    console.log(suggestion);
    // setVehiclePanel(true);
    // setPanelOpen(false);
  };

  return (
    <div>
      {/* Display fetched suggestions */}
      {Array.isArray(suggestions) && suggestions.length > 0 ? (
        suggestions.map((elem, idx) => (
          <div
            key={idx}
            onClick={() => handleSuggestionClick(elem)}
            className="flex gap-4 border-2 p-3 border-gray-50 active:border-black rounded-xl items-center my-2 justify-start cursor-pointer"
          >
            <h2 className="bg-[#eee] h-8 flex items-center justify-center w-12 rounded-full">
              <i className="ri-map-pin-fill"></i>
            </h2>
            <div>
              <h4 className="font-medium">{elem.display_name}</h4>
              <p className="text-sm text-gray-500">
                {/* Lat: {elem.lat}, Lon: {elem.lon} */}
              </p>
            </div>
          </div>
        ))
      ) : (
        <p className="text-gray-400 text-center py-3">
          No suggestions available.
        </p>
      )}
    </div>
  );
};

export default LocationSearchPanel;

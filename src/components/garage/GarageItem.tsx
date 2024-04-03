

import React, { useState } from "react";
import { Car } from "../../types/types";
import { updateCar } from "../../services/api";
import "./GarageItem.css";

interface GarageItemProps {
  car: Car;
}

const GarageItem: React.FC<GarageItemProps> = ({ car }) => {
  const [isEngineOn, setIsEngineOn] = useState(false);

  const toggleEngine = async () => {
    try {
      const updatedCar = await updateCar(car.id, {
        engineStatus: isEngineOn ? "stopped" : "started",
      });
      setIsEngineOn(!isEngineOn);
      console.log("Engine status updated:", updatedCar);
    } catch (error) {
      console.error("Error updating engine status:", error);
    }
  };

  return (
    <div className={`car ${isEngineOn ? "engine-on" : "engine-off"}`}>
      <img src={car.image} alt={car.name} />
      <button onClick={toggleEngine}>
        {isEngineOn ? "Stop Engine" : "Start Engine"}
      </button>
    </div>
  );
};

export default GarageItem;

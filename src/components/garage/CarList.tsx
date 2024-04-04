import React, { useEffect, useState } from "react";
import { Car } from "../../types/types";
import { deleteCar, updateEngineStatus } from "../../services/api";

import SportsCarIcon from "./CarIconSVG";
import { motion } from "framer-motion";

interface CarListProps {
  cars: Car[];
  updateCarsState: (updatedCars: Car[]) => void;
}

const CarList: React.FC<CarListProps> = ({ cars, updateCarsState }) => {
  const [carPositions, setCarPositions] = useState<{
    [key: number]: { position: number; duration: number };
  }>({});

  const handleToggleEngine = async (carId: number, isEngineOn: boolean) => {
    const newStatus = isEngineOn ? "stopped" : "started";
    await updateEngineStatus(carId, newStatus);

    const updatedCars = cars.map((car) =>
      car.id === carId ? { ...car, engineStatus: newStatus } : car
    );

    updateCarsState(updatedCars);

    const response = await updateEngineStatus(carId, newStatus);
    const updatedVelocity = response.velocity; 
    const distance = response.distance; 

    console.log(updatedVelocity);
    if (updatedVelocity) {
      const animationDuration = distance && distance / updatedVelocity;
      console.log(animationDuration);

      const newPosition = carPositions[carId]
        ? carPositions[carId].position + (distance || 0) 
        : distance || 0;
      setCarPositions((prevCarPositions) => ({
        ...prevCarPositions,
        [carId]: {
          position: newPosition,
          duration: animationDuration || 0,
        },
      }));
    } else {
      delete carPositions[carId];
    }
  };

  const handleRemoveCar = async (carId: number) => {
    await deleteCar(carId);
    const updatedCars = cars.filter((car) => car.id !== carId);

    updateCarsState(updatedCars);
  };
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Car List</h2>
      {cars.map((car) => (
        <div key={car.id} className="flex items-center mb-4">
          {/* Car Select and Remove Button */}
          <div className="flex flex-col gap-1">
            <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
              Select
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => handleRemoveCar(car.id)}
            >
              Remove
            </button>
          </div>
          {/* Car Start Button */}
          <button
            className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            onClick={() =>
              handleToggleEngine(car.id, car.engineStatus === "started")
            }
          >
            {car.engineStatus === "started" ? "Stop Engine" : "Start Engine"}
          </button>
          {/* Car Icon */}
          <motion.div
            style={{ marginLeft: "10px" }} 
            initial={{ opacity: 0, x: 0 }}
            animate={{ opacity: 1, x: carPositions[car.id]?.position || 0 }}
            transition={{ duration: carPositions[car.id]?.duration || 0.5 }}
          >
            <SportsCarIcon color={car.color} />
          </motion.div>

          {/* Car Name */}
          <p className="ml-2">{car.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CarList;

import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Car } from "../../types/types";
import { deleteCar } from "../../services/api";

import SportsCarIcon from "./CarIconSVG";
import { motion } from "framer-motion";
import { handleToggleEngine } from "../../utils/toggleEngine";

interface CarListProps {
  cars: Car[];
  updateCarsState: Dispatch<SetStateAction<Car[]>>;
  handleSelectCar: (carId: number) => void;
}
interface CarPositions {
  [key: string]: { position: number; duration: number };
}

const CarList: React.FC<CarListProps> = ({
  cars,
  updateCarsState,
  handleSelectCar,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);
  const carsPerPage: number = 7;

  const indexOfLastCar: number = currentPage * carsPerPage;
  const indexOfFirstCar: number = indexOfLastCar - carsPerPage;
  const currentCars: Car[] = cars.slice(indexOfFirstCar, indexOfLastCar);

  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);

  const [carPositions, setCarPositions] = useState<{
    [key: number]: { position: number; duration: number };
  }>({});
  const carRef = useRef<HTMLDivElement>(null);

  const handleToggleEngineWrapper = async (
    carId: number,
    isEngineOn: boolean
  ) => {
    await handleToggleEngine(
      carId,
      isEngineOn,
      carRef,
      carPositions,
      cars,
      updateCarsState,
      setCarPositions
    );
  };

  const handleRemoveCar = async (carId: number) => {
    await deleteCar(carId);
    const updatedCars = cars.filter((car) => car.id !== carId);

    updateCarsState(updatedCars);
  };

  const resetPositions = (carId?: number) => {
    const updatedPositions: CarPositions = {};
    const updatedCars: Car[] = cars.map((car) => {
      if (carId && car.id === carId) {
        return {
          ...car,
          engineStatus: "stopped",
        };
      }
      return car;
    });

    if (carId) {
      updatedPositions[carId] = { position: 0, duration: 0 };
    } else {
      for (const car of cars) {
        updatedPositions[car.id] = { position: 0, duration: 0 };
      }
    }

    setCarPositions((prevPositions) => ({
      ...prevPositions,
      ...updatedPositions,
    }));
    updateCarsState(updatedCars);
  };

  const raceAll = async () => {
    const startEnginePromises = [];
    const updatedCars: Car[] = [];

    for (const car of currentCars) {
      startEnginePromises.push(handleToggleEngineWrapper(car.id, false));
      updatedCars.push({ ...car, engineStatus: "started" });
    }

    await Promise.all(startEnginePromises);
    updateCarsState((prevCars) =>
      prevCars.map(
        (car) =>
          updatedCars.find((updatedCar) => updatedCar.id === car.id) || car
      )
    );
  };

  return (
    <div className="flex flex-col justify-between h-1/2">
      <h2 className="text-lg font-bold mb-4">Car List</h2>

      <div className="flex justify-center gap-10">
        <button
          onClick={raceAll}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Race All
        </button>
        <button
          onClick={() => resetPositions()}
          className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Reset Positions
        </button>
      </div>

      <div>
        {currentCars.map((car) => (
          <div key={car.id} className="flex items-center mb-4">
            {/* Car Select and Remove Button */}
            <div className="flex flex-col gap-1">
              <button
                className={`bg-${
                  selectedCarId === car.id ? "green" : "red"
                }-500 hover:bg-${
                  selectedCarId === car.id ? "green" : "red"
                }-600 text-white font-bold py-2 px-4 rounded`}
                onClick={() => handleSelectCar(car.id)}
              >
                {selectedCarId === car.id ? "Selected" : "Select"}
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => handleRemoveCar(car.id)}
              >
                Remove
              </button>
            </div>
            {/* Car Start Button */}
            <div className="flex flex-col gap-1">
              {" "}
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() =>
                  handleToggleEngineWrapper(
                    car.id,
                    car.engineStatus === "started"
                  )
                }
                disabled={car.engineStatus === "started"}
              >
                {car.engineStatus === "started" ? "Stop" : "Start"}
              </button>
              <button
                className="ml-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                onClick={() => resetPositions(car.id)}
              >
                Reset
              </button>
            </div>
            {/* Car Icon */}
            <div
              className="flex items-center bg-gray-700  w-full "
              ref={carRef}
            >
              <motion.div
                style={{ marginLeft: "10px" }}
                initial={{
                  x:
                    carPositions[car.id]?.position > 100
                      ? carPositions[car.id]?.position
                      : 0,
                }}
                animate={{ x: carPositions[car.id]?.position || 0 }}
                transition={{ duration: carPositions[car.id]?.duration || 0.5 }}
              >
                <SportsCarIcon color={car.color} />
              </motion.div>

              {/* Car Name */}
              <p className="ml-2">{car.name}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mt-4 justify-center">
        {/* Pagination buttons */}
        {Array.from({ length: Math.ceil(cars.length / carsPerPage) }).map(
          (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
              className={`${
                currentPage === index + 1
                  ? "bg-blue-700"
                  : "bg-blue-500 hover:bg-blue-700"
              } text-white font-bold py-2 px-4 rounded`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default CarList;

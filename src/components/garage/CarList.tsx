import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import { Car } from "../../types/types";
import { deleteCar, getWinners, updateWinner } from "../../services/api";

import SportsCarIcon from "./CarIconSVG";
import { motion } from "framer-motion";
import { handleToggleEngine } from "../../utils/toggleEngine";

interface FastestCarInfo {
  carId: number;
  time: number;
}

interface CarListProps {
  cars: Car[];
  updateCarsState: Dispatch<SetStateAction<Car[]>>;
  handleSelectCar: (carId: number) => void;
  selectedCarId: number | null;
}
interface CarPositions {
  [key: string]: { position: number; duration: number };
}

const CarList: React.FC<CarListProps> = ({
  cars,
  updateCarsState,
  handleSelectCar,
  selectedCarId,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const carsPerPage: number = 5;
  const indexOfLastCar: number = currentPage * carsPerPage;
  const indexOfFirstCar: number = indexOfLastCar - carsPerPage;
  const currentCars: Car[] = cars.slice(indexOfFirstCar, indexOfLastCar);
  const paginate = (pageNumber: number): void => setCurrentPage(pageNumber);
  const [positionsReset, setPositionsReset] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [fastestCarInfo, setFastestCarInfo] = useState<FastestCarInfo | null>(
    null
  );

  const openModal = (fastestCarId: string, time: number) => {
    setFastestCarInfo({
      carId: parseInt(fastestCarId),
      time: time,
    });
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const [carPositions, setCarPositions] = useState<{
    [key: number]: { position: number; duration: number };
  }>({});
  const carRef = useRef<HTMLDivElement>(null);

  const [raceTimes, setRaceTimes] = useState<{ [carId: number]: number }>({});
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
      setCarPositions,
      raceTimes,
      setRaceTimes
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
    setPositionsReset(true);
  };

  const raceAll = async () => {
    setPositionsReset(false);
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

  const [isWinnerDetermined, setIsWinnerDetermined] = useState(false);
  useEffect(() => {
    const raceCount: number[] = [];

    const fastestCarId = Object.keys(raceTimes).reduce(
      (fastestId: string | null, carId) => {
        if (raceCount.length < currentCars.length) {
          raceCount.push(1);
        }
        if (
          !fastestId ||
          raceTimes[parseInt(carId)] < raceTimes[parseInt(fastestId)]
        )
          return carId;
        else return fastestId;
      },

      null
    );
    if (
      fastestCarId &&
      raceCount.length >= currentCars.length &&
      !isWinnerDetermined
    ) {
      const time = raceTimes[parseInt(fastestCarId)];
      console.log("hello");
      console.log(raceCount);

      updateWinner(parseInt(fastestCarId), time)
        .then(() => {
          console.log("Winner updated successfully", time);
          openModal(fastestCarId, time);
          setIsWinnerDetermined(true);
          raceCount.length = 0;
        })
        .catch((error) => console.error("Error updating winner:", error));
    }

    getWinners();
    console.log("Fastest Car:", fastestCarId);
  }, [raceTimes, currentCars.length, isWinnerDetermined]);

  return (
    <div className="flex flex-col justify-between h-1/2">
      <div className="flex  gap-10 mb-5">
        <button
          onClick={raceAll}
          disabled={!positionsReset}
          className="px-8 py-4 rounded-lg text-white font-bold border border-green-500 hover:bg-green-500"
        >
          Race All
        </button>
        <button
          onClick={() => resetPositions()}
          className="px-8 py-4 rounded-lg text-white font-bold border border-purple-500 hover:bg-purple-500"
        >
          Reset Positions
        </button>
      </div>

      <div>
        {currentCars.map((car) => (
          <div key={car.id} className="flex  mb-4">
            <div className="flex flex-col gap-1 ">
              <button
                className={`bg-${
                  selectedCarId === car.id ? "green" : "red"
                }-500 hover:bg-${
                  selectedCarId === car.id ? "green" : "red"
                }-600 text-white font-bold py-2  rounded`}
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
            <div className="flex flex-col gap-1 mr-4">
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
              className="flex items-center  w-full border-t-[8px] border-b-[8px]  border-white"
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
              <p className="ml-2 text-white text-2xl">{car.name}</p>
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
      {showModal && fastestCarInfo && (
        <div className="fixed inset-0 flex justify-center items-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-bold mb-4">Fastest Car</h2>
            <p>Car ID: {fastestCarInfo.carId}</p>
            <p>Time: {fastestCarInfo.time}</p>
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CarList;

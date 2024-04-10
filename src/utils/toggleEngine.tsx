import { updateEngineStatus, } from "../services/api";
import { RefObject, Dispatch, SetStateAction } from "react";
import { Car } from "../types/types";

const handleToggleEngine = async (
  carId: number,
  isEngineOn: boolean,
  carRef: RefObject<HTMLDivElement>,
  carPositions: { [key: number]: { position: number; duration: number } },
  cars: Car[],
  updateCarsState: Dispatch<SetStateAction<Car[]>>,
  setCarPositions: Dispatch<
    SetStateAction<{ [key: number]: { position: number; duration: number } }>
  >,
  raceTimes: { [key: number]: number },
  setRaceTimes: Dispatch<SetStateAction<{ [key: number]: number }>>
): Promise<void> => {
  const newStatus = "started";

  const rawWidth = carRef.current
    ? carRef.current.getBoundingClientRect().width
    : 0;
  const divWidth = rawWidth - 100 >= 0 ? rawWidth - 100 : 0;

  await updateEngineStatus(carId, newStatus, divWidth);

  const updatedCars = cars.map((car) =>
    car.id === carId ? { ...car, engineStatus: newStatus } : car
  );

  updateCarsState(updatedCars);

  const response = await updateEngineStatus(carId, newStatus, divWidth);
  const updatedVelocity = response.velocity;
  const distance = Number(response.distance);

  if (updatedVelocity) {
    const scalingFactor = 0.4;
    const animationDuration =
      (distance && distance * scalingFactor) / updatedVelocity;
    const raceTime = parseFloat(animationDuration.toFixed(2));
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

    await setRaceTimes((prevRaceTimes) => {
      const updatedRaceTimes: { [key: number]: number } = {
        ...prevRaceTimes,
        [carId]: raceTime,
      };

      return updatedRaceTimes;
    });
  } else {
    delete carPositions[carId];
  }
};

export { handleToggleEngine };

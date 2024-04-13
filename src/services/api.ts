import axios from "axios";
import { Car } from "../types/types";
import getRandomCars from "../components/garage/GenerateCars";

const API_BASE_URL = "https://asyncrace-1.onrender.com";

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get(`${API_BASE_URL}/garage`);
  return response.data;
};

export const updateEngineStatus = async (
  id: number,
  status: string,
  width: number
): Promise<Car> => {
  const response = await axios.patch(
    `${API_BASE_URL}/engine?id=${id}&status=${status}&width=${width}`
  );
  return response.data;
};

export const createCar = async (car: Partial<Car>): Promise<Car> => {
  const response = await axios.post(`${API_BASE_URL}/garage`, car);
  return response.data;
};

export const addCar = async (newCar: Partial<Car>): Promise<Car> => {
  const response = await axios.post(`${API_BASE_URL}/garage`, newCar);
  return response.data;
};

export const addRandomCars = async (
  count: number,
  lastCarIndex: number
): Promise<Car[]> => {
  try {
    const randomCars = getRandomCars(count).map((car, index) => ({
      ...car,
      id: lastCarIndex + index + 1,
    }));

    const promises = randomCars.map((car) => addCar(car));
    return Promise.all(promises);
  } catch (error) {
    console.error("Error adding random cars:", error);
    throw error;
  }
};
export const updateCar = async (
  id: number,
  updatedCar: Partial<Car>
): Promise<Car> => {
  const response = await axios.patch(
    `${API_BASE_URL}/garage/${id}`,
    updatedCar
  );
  return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/garage/${id}`);
};

export const updateWinner = async (
  carId: number,
  time: number
): Promise<void> => {
  try {
    const winners = await getWinners();
    const existingWinner = winners.find((winner: Car) => winner.id === carId);

    if (existingWinner) {
      await axios.put(`${API_BASE_URL}/winners/${carId}`, {
        carId,
        time,
        wins: (existingWinner.wins ?? 0) + 1,
      });
    } else {
      await axios.post(`${API_BASE_URL}/winners`, {
        carId,
        time,
        wins: 1,
      });
    }
  } catch (error) {
    console.error("Error updating winner:", error);
  }
};

export const getWinners = async (): Promise<Car[]> => {
  const response = await axios.get(`${API_BASE_URL}/winners`);

  return response.data;
};

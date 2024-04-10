import axios from "axios";
import { Car, Winner } from "../types/types";
import getRandomCars from "../components/garage/GenerateCars";
import { log } from "console";

const API_BASE_URL = "http://localhost:3000";

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

export const addRandomCars = async (count: number): Promise<Car[]> => {
  const randomCars = getRandomCars(count);
  const promises = randomCars.map((car) => addCar(car));
  return Promise.all(promises);
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
  const response = await axios.post(`${API_BASE_URL}/winners`, {
    carId,
    time,
  });
  console.log(response);

  return response.data;
};

export const getWinners = async (): Promise<Car[]> => {
  const response = await axios.get(`${API_BASE_URL}/winners`);
  console.log(response.data);

  return response.data;
};

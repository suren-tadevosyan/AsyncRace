

import axios from "axios";
import { Car } from "../types/types";

const API_BASE_URL = "http://localhost:3000"; 

export const getCars = async (): Promise<Car[]> => {
  const response = await axios.get(`${API_BASE_URL}/garage`);
  return response.data;
};

export const updateEngineStatus = async (
  id: number,
  status: string
): Promise<Car> => {
  const response = await axios.patch(
    `${API_BASE_URL}/engine?id=${id}&status=${status}`
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

export const updateCar = async (
  id: number,
  car: Partial<Car>
): Promise<Car> => {
  const response = await axios.patch(`${API_BASE_URL}/garage/${id}`, car);
  return response.data;
};

export const deleteCar = async (id: number): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/garage/${id}`);
};

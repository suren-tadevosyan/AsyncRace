import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import AddCarForm from "./AddCarForm";
import { Car } from "../../types/types";
import { getCars, addCar, addRandomCars } from "../../services/api";
import CarList from "./CarList";

const GarageView: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    try {
      const carsData = await getCars();
      setCars(carsData);
    } catch (error) {
      console.error("Error fetching cars:", error);
    }
  };

  const handleSubmit = async (name: string, color: string) => {
    try {
      const newCar = await addCar({ name, color });
      setCars([...cars, newCar]);
      console.log("New car added:", newCar);
    } catch (error) {
      console.error("Error adding new car:", error);
    }
  };

  const handleAddRandomCars = async () => {
    try {
      const randomCars = await addRandomCars(100);
      setCars([...cars, ...randomCars]);
      console.log("Random cars added:", randomCars);
    } catch (error) {
      console.error("Error adding random cars:", error);
    }
  };

  return (
    <div className="bg-gray-800 min-h-screen h-full">
      <h2>Garage</h2>
      <AddCarForm onSubmit={handleSubmit} />
      <button onClick={handleAddRandomCars}>Add 100 Random Cars</button>
      <div>
        <CarList cars={cars} updateCarsState={setCars} />
      </div>
    </div>
  );
};

export default GarageView;

import React, { useState, useEffect } from "react";
import AddCarForm from "./AddCarForm";
import { Car } from "../../types/types";
import { getCars, addCar, addRandomCars, updateCar } from "../../services/api";
import CarList from "./CarList";
import EditCarForm from "./UpdateCar";

const GarageView: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [selectedCarId, setSelectedCarId] = useState<number | null>(null);

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
      const lastCarIndex = cars.length > 0 ? cars[cars.length - 1].id : 0;
      const randomCars = await addRandomCars(50, lastCarIndex);
      setCars([...cars, ...randomCars]);

      console.log("Random cars added:", randomCars);
    } catch (error) {
      console.error("Error adding random cars:", error);
    }
  };
  const handleSelectCar = (carId: number) => {
    setSelectedCarId(carId === selectedCarId ? null : carId);
  };

  const handleSubmitEdit = async (
    carId: number,
    name: string,
    color: string
  ) => {
    try {
      const updatedCar = await updateCar(carId, { name, color });

      const updatedCars = cars.map((car) =>
        car.id === updatedCar.id ? updatedCar : car
      );
      setCars(updatedCars);
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="  flex flex-col mx-10">
      <div className="flex justify-between">
        <AddCarForm onSubmit={handleSubmit} />
        <EditCarForm
          carId={selectedCarId || 0}
          initialName={cars.find((car) => car.id === selectedCarId)?.name || ""}
          initialColor={
            cars.find((car) => car.id === selectedCarId)?.color || "#000000"
          }
          onSubmit={handleSubmitEdit}
        />
        <div className="flex items-center">
          {" "}
          <button
            onClick={handleAddRandomCars}
            className=" text-white py-2 px-4 rounded-lg hover:bg-pink-600 transition duration-300 border border-pink-600"
          >
            Add 50 Random Cars
          </button>
        </div>
      </div>
      <div>
        <CarList
          cars={cars}
          updateCarsState={setCars}
          handleSelectCar={handleSelectCar}
          selectedCarId={selectedCarId}
        />
      </div>
    </div>
  );
};

export default GarageView;

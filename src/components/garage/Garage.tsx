
// src/components/garage/GarageView.tsx

import React, { useState, useEffect } from 'react';
import AddCarForm from './AddCarForm';
import { Car } from '../../types/types';
import { getCars, addCar } from '../../services/api';

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
      console.error('Error fetching cars:', error);
    }
  };

  const handleSubmit = async (name: string, color: string) => {
    try {
      const newCar = await addCar({ name, color }); // Send POST request to add new car
      setCars([...cars, newCar]); // Update state with newly added car
      console.log('New car added:', newCar);
    } catch (error) {
      console.error('Error adding new car:', error);
    }
  };

  return (
    <div>
      <h2>Garage</h2>
      <AddCarForm onSubmit={handleSubmit} /> {/* Render AddCarForm component */}
      <div>
        {/* Display the list of cars in the garage */}
        {cars.map((car) => (
          <div key={car.id}>
            <p>{car.name}</p>
            <p>{car.color}</p>
            {/* Add more details if needed */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default GarageView;

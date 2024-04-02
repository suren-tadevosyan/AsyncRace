// CarList.tsx
import React, { useEffect, useState } from 'react';
import { Car } from '../../types/types';
import { getCars, updateEngineStatus } from '../../services/api';

const CarList: React.FC = () => {
  const [cars, setCars] = useState<Car[]>([]);

  useEffect(() => {
    fetchCars();
  }, []);

  const fetchCars = async () => {
    const fetchedCars = await getCars();
    setCars(fetchedCars);
  };

  const handleToggleEngine = async (carId: number, isEngineOn: boolean) => {
    const newStatus = isEngineOn ? 'stopped' : 'started';
    await updateEngineStatus(carId, newStatus);
    // Update the local state to reflect the change in engine status
    setCars(prevCars =>
      prevCars.map(car =>
        car.id === carId ? { ...car, engineStatus: newStatus } : car
      )
    );
  };

  return (
    <div>
      <h2>Car List</h2>
      {cars.map(car => (
        <div key={car.id}>
          <p>{car.name}</p>
          <p>{car.color}</p>
          <p>{car.engineStatus}</p>
          <button onClick={() => handleToggleEngine(car.id, car.engineStatus === 'started')}>
            {car.engineStatus === 'started' ? 'Stop Engine' : 'Start Engine'}
          </button>
        </div>
      ))}
    </div>
  );
};

export default CarList;

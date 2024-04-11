import React, { useState, useEffect } from "react";
import axios from "axios";
import { getCars } from "../../services/api";
import SportsCarIcon from "../garage/CarIconSVG";

interface Winner {
  wins: number;
}
interface Car {
  id: number;
  name: string;
  color: string;
}

const WinnersView: React.FC = () => {
  const [winners, setWinners] = useState<any[]>([]);
  const [garage, setGarage] = useState<Car[]>([]);
  useEffect(() => {
    fetchWinners();
    fetchGarage();
  }, []);

  const fetchGarage = async () => {
    try {
      const response = await getCars();
      setGarage(response);
    } catch (error) {
      console.error("Error fetching garage data:", error);
    }
  };

  const getCarDetails = (carId: number): Car | undefined => {
    return garage.find((car) => car.id === carId);
  };

  const fetchWinners = async () => {
    try {
      const response = await axios.get<Winner[]>(
        "http://localhost:3000/winners"
      );
      const sortedWinners = response.data.sort(
        (a: Winner, b: Winner) => b.wins - a.wins
      );
      setWinners(sortedWinners);
    } catch (error) {
      console.error("Error fetching winners:", error);
    }
  };

  return (
    <div className="h-full py-8">
      <h2 className="text-green-400 text-6xl font-bold mb-8  text-center">
        Winners
      </h2>
      <div className="w-screen-lg ">
        <div className="overflow-x-auto">
          <table className="table-auto w-full border-collapse  border border-gray-700">
            <thead>
              <tr className="bg-gray-800 border border-purple-500 ">
                <th className="px-4 py-8 text-white text-left">ID</th>
                <th className="px-4 py-8 text-white text-left">Car</th>
                <th className="px-4 py-2 text-white text-left"> Name</th>
                <th className="px-4 py-2 text-white text-left">Wins</th>
                <th className="px-4 py-2 text-white text-left">Best Time</th>
              </tr>
            </thead>
            <tbody>
              {winners.map((winner) => {
                const car = getCarDetails(winner.carId);
                return (
                  <tr key={winner.id} className="bg-gray-700">
                    <td className="border text-white  px-4 py-2">
                      {winner.id}
                    </td>
                    <td className="border px-4 py-2">
                      <SportsCarIcon color={car?.color} />
                    </td>
                    <td className="border text-white px-4 py-2">
                      {car ? car.name : "Unknown Car"}
                    </td>
                    <td className="border text-white px-4 py-2">
                      {winner.wins}
                    </td>
                    <td className="border text-white px-4 py-2">
                      {winner.time}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default WinnersView;

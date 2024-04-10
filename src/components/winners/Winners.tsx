import React, { useState, useEffect } from "react";
import axios from "axios";

const WinnersView: React.FC = () => {
  const [winners, setWinners] = useState<any[]>([]);
  useEffect(() => {
    fetchWinners();
  }, []);

  const fetchWinners = async () => {
    try {
      const response = await axios.get("http://localhost:3000/winners");
      setWinners(response.data);
    } catch (error) {
      console.error("Error fetching winners:", error);
    }
  };

  return (
    <div className="bg-green-800 min-h-screen h-full">
      <h2 className="text-white text-lg font-bold mb-4">Winners</h2>
      <div className="flex flex-wrap justify-center">
        {winners.map((winner) => (
          <div key={winner.id} className="m-2 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white text-lg font-semibold">{winner.carId}</h3>
            <p className="text-gray-400">Wins: {winner.wins}</p>
            <p className="text-gray-400">Time: {winner.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WinnersView;




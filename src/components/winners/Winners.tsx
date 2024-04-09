import React, { useState, useEffect } from "react";
// import { Winner } from "../../types/types";
// import { getWinners } from "../../services/api";

const WinnersView: React.FC = () => {
  //   useEffect(() => {
  //     fetchWinners();
  //   }, []);

  //   const fetchWinners = async () => {
  //     try {
  //       const winnersData = await getWinners();
  //       setWinners(winnersData);
  //     } catch (error) {
  //       console.error("Error fetching winners:", error);
  //     }
  //   };

  return (
    <div className="bg-green-800 min-h-screen h-full">
      <h2 className="text-white text-lg font-bold mb-4">Winners</h2>
      <div className="flex flex-wrap justify-center">
        {/* {winners.map((winner) => (
          <div key={winner.id} className="m-2 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-white text-lg font-semibold">
              {winner.name}
            </h3>
            <p className="text-gray-400">Prize: {winner.prize}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};

export default WinnersView;

import "./App.css";
import { useState } from "react";
import GarageView from "./components/garage/Garage";
import WinnersView from "./components/winners/Winners";

function App() {
  const [showWinnersView, setShowWinnersView] = useState(false);

  const showGarage = () => {
    setShowWinnersView(false);
  };

  const showWinners = () => {
    setShowWinnersView(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <div className="flex gap-4 flex-col mt-10 ml-10">
          <div>
            <button
              onClick={showGarage}
              className={`px-8 py-4 rounded-lg font-bold w-[200px] ${
                !showWinnersView ? " text-white" : " text-gray-700"
              } border border-green-500`}
            >
              Garage
            </button>
          </div>
          <div>
            <button
              onClick={showWinners}
              className={`px-8 py-4 rounded-lg font-bold w-[200px] ${
                showWinnersView ? " text-white" : " text-gray-700"
              } border border-purple-500`}
            >
              Winners
            </button>
          </div>
        </div>
        {showWinnersView ? <WinnersView /> : <GarageView />}
      </header>
    </div>
  );
}

export default App;

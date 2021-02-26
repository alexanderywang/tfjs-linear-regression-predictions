import React, { useState } from "react";
import "./App.css";
import Api from "./Api";
import DataVisualization from "./DataVisualization";

function App() {
  const [filteredData, setFilteredData] = useState([]);

  const filterData = data => {
    const filtered = data
      .map(car => ({
        mpg: car.Miles_per_Gallon,
        horsepower: car.Horsepower
      }))
      .filter(car => car.mpg != null && car.horsepower != null);
    // need to clean the data in case there are are null values
    // console.log("filtered data", filtered);
    setFilteredData(filtered);
  };

  return (
    <div className="App">
      Hello TensorFlow
      <ul text-align="left">
        <li>` (backtick): Shows or hides the visor after getting data</li>
        <li>
          ~ (tilde, shift+backtick): Toggles betweeen the two sizes the visor
          supports
        </li>
      </ul>
      <Api filter={filterData} />
      <DataVisualization cleanedData={filteredData} />
    </div>
  );
}

export default App;

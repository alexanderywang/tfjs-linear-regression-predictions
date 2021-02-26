import React, { useState } from "react";
import "./App.css";
import Api from "./Api";

function App() {
  const [filteredData, setFilteredData] = useState([]);

  const filterData = data => {
    const filtered = data.map(car => ({
      mpg: car.Miles_per_Gallon,
      horsepower: car.Horsepower
    }));
    // console.log("filtered data", filtered);
    setFilteredData(filtered);
  };
  
  return (
    <div className="App">
      Hello TensorFlow
      <Api filter={filterData} />
    </div>
  );
}

export default App;

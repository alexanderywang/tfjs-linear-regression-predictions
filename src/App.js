import React, { useState } from "react";
import "./App.css";
import Api from "./Api";
import DataVisualization from "./DataVisualization";
import { convertToTensor } from "./PreppingData";
import { trainModel } from "./TrainingTheModel";
import { createModel } from "./Model";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [trainingStatus, setTrainingStatus] = useState(true);

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

  const prepAndTrainModel = async () => {
    // convert the data to tensors
    const tensorData = convertToTensor(filteredData);
    const { inputs, labels } = tensorData;

    // train model
    const model = createModel();
    console.log(model);
    await trainModel(model, inputs, labels);
    console.log("Done Training");
    setTrainingStatus(false);
  };
  return (
    <div className="App">
      Hello TensorFlow
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start"
        }}
      >
        <li>` (backtick): Shows or hides the visor after getting data</li>
        <li>
          ~ (tilde, shift+backtick): Toggles betweeen the two sizes the visor
          supports
        </li>
      </ul>
      <Api filter={filterData} />
      <DataVisualization cleanedData={filteredData} />
      <button onClick={prepAndTrainModel}>
        {trainingStatus ? `Train the model!` : `Training Done!`}
      </button>
    </div>
  );
}

export default App;

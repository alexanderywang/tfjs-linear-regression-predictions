import React, { useState } from "react";
import "./App.css";
import Api from "./Api";
import DataVisualization from "./DataVisualization";
import Prediction from "./Prediction";
import { convertToTensor } from "./PreppingData";
import { trainModel } from "./TrainingTheModel";
import { createModel } from "./Model";
import { testModel } from "./TestModel";

function App() {
  const [filteredData, setFilteredData] = useState([]);
  const [trainingStatus, setTrainingStatus] = useState(true);
  const [finishedModel, setFinishedModel] = useState({});
  const [normalizationData, setNormalizationData] = useState({});

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
    // console.log("setting", tensorData);
    // setNormalizationData(convertToTensor(filteredData));
    // console.log("normalized", normalizationData);
    const { inputs, labels } = tensorData;

    // train model
    const model = createModel();
    console.log("model:", model);
    await trainModel(model, inputs, labels);
    console.log("Done Training");
    // setFinishedModel(finishedModel);
    testModel(model, filteredData, tensorData);
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
        {trainingStatus
          ? `Train the model and run test for linear regression!`
          : `Training Done!`}
      </button>
      <br />
      {!trainingStatus && (
        <>
          <Prediction />
        </>
      )}
    </div>
  );
}

export default App;

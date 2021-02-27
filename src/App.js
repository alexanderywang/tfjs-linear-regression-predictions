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
  const [model, setModel] = useState({});
  const [epochs, setEpochs] = useState(50);

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
    console.log("model:", model);
    await trainModel(model, inputs, labels, epochs);
    setModel(model);
    console.log("Done Training");
    testModel(model, filteredData, tensorData);
    setTrainingStatus(false);
  };

  const onChange = e => {
    setEpochs(e.target.value * 1);
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
      <RecordEpochs onChange={onChange} />
      <button onClick={prepAndTrainModel}>
        {trainingStatus
          ? `Train the model and run test for linear regression!`
          : `Training Done!`}
      </button>
      <br />
      {!trainingStatus && <Prediction model={model} />}
    </div>
  );
}

export default App;

const RecordEpochs = ({ onChange }) => {
  return (
    <form>
      <input type="number" name="epochs" onChange={onChange} />
      <span>How many epochs to run?</span>
    </form>
  );
};

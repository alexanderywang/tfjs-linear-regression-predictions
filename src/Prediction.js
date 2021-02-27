import React, { useState } from "react";
import * as tf from "@tensorflow/tfjs";

const Prediction = ({ model }) => {
  console.log("Prediction model", model);
  const [prediction, setPrediction] = useState(0);
  const [userHPInput, setUserHPInput] = useState(0);

  const onChange = e => {
    setUserHPInput(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();

    makePrediction();
  };
  const makePrediction = () => {
    // const value = model.predict(tf.tensor([userHPInput * 1])); // works and is more generic
    const value = model.predict(tf.tensor2d([userHPInput * 1], [1, 1]));
    // console.log(
    //   "prediction value",
    //   value.dataSync(),
    //   value.data(),
    //   value.dataSync()[0]
    // );
    // unsure why value is negative
    setPrediction(Math.abs(value.dataSync()[0]).toFixed(4));
  };

  return (
    <>
      <h4>Input Horsepower</h4>
      <form onSubmit={onSubmit}>
        <input
          type="number"
          name="hp"
          value={userHPInput}
          onChange={onChange}
        />
        <br />
        <button type="submit" onClick={onSubmit}>
          Make an MPG prediction
        </button>
      </form>
      {prediction && <h3>Prediction: {prediction}</h3>}
      {/* <h3>Prediction: {prediction}</h3> */}
    </>
  );
};

export default Prediction;

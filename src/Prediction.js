import React, { useState } from "react";

const Prediction = () => {
  const [prediction, setPrediction] = useState(null);
  const [userHPInput, setUserHPInput] = useState(0);

  const onChange = e => {
    console.log(e.target.value);
  };
  const onSubmit = e => {
    e.preventDefault();
    setUserHPInput(e.target.value);
  };
  const makePrediction = () => {};

  return (
    <>
      <h4>Input Horsepower</h4>
      <form onSubmit={onSubmit}>
        <input type="number" name="hp" onChange={onChange} />
        <br />
        <button onSubmit={onSubmit}>Make an MPG prediction</button>
      </form>
      {prediction !== null && <h3>Prediction: {prediction}</h3>}
    </>
  );
};

export default Prediction;

import React, { useState } from "react";
import axios from "axios";

const Api = () => {
  const URL = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";
  /*********
   * SHAPE OF THE DATA FOR REFERENCE:
   * arrays of 100 car objects
   * each object has {Acceleration, Cylinders, Displacement, Horsepower, Miles_perGallon, Name, Origin, Weight_in_lbs, Year }
   * Name, Oriign, Year are strings. rest are numbers
   */
  const [carInfo, setCarInfo] = useState([]);

  const getData = async () => {
    const { data } = await axios(URL);
    // console.log(data);
    setCarInfo(data);
  };

  return (
    <div>
      <button onClick={getData}>Get Data</button>
      <h4>An example of a car object data:</h4>
      <h6>Acceleration: {carInfo[0].Acceleration}</h6>
      <h6>xCylinders: {carInfo[0].xCylinders}</h6>
      <h6>Displacement: {carInfo[0].Displacement}</h6>
      <h6>Horsepower: {carInfo[0].Horsepower}</h6>
      <h6>Miles_perGallon: {carInfo[0].Miles_perGallon}</h6>
      <h6>Name: {carInfo[0].Name}</h6>
      <h6>Origin: {carInfo[0].Origin}</h6>
      <h6>Weight_in_lbs: {carInfo[0].Weight_in_lbs}</h6>
      <h6>Year: {carInfo[0].Year}</h6>
    </div>
  );
};

export default Api;

import React, { useState } from "react";
import axios from "axios";

const Api = ({ filter }) => {
  const URL = "https://storage.googleapis.com/tfjs-tutorials/carsData.json";
  /*********
   * SHAPE OF THE DATA FOR REFERENCE:
   * array of 406 car objects
   * each object has {Acceleration, Cylinders, Displacement, Horsepower, Miles_perGallon, Name, Origin, Weight_in_lbs, Year }
   * Name, Oriign, Year are strings. rest are numbers
   */
  const [carInfo, setCarInfo] = useState([]);

  const getData = async () => {
    const { data } = await axios(URL);
    console.log(data);
    setCarInfo(data);
    filter(data);
  };

  return (
    <div>
      <button onClick={getData}>Get Data</button>
      {carInfo.length ? (
        <>
          <h4>An example of a car object data:</h4>
          <h6>Acceleration: {carInfo[0].Acceleration}</h6>
          <h6>Cylinders: {carInfo[0].Cylinders}</h6>
          <h6>Displacement: {carInfo[0].Displacement}</h6>
          <h6>Horsepower: {carInfo[0].Horsepower}</h6>
          <h6>Miles_per_Gallon: {carInfo[0].Miles_per_Gallon}</h6>
          <h6>Name: {carInfo[0].Name}</h6>
          <h6>Origin: {carInfo[0].Origin}</h6>
          <h6>Weight_in_lbs: {carInfo[0].Weight_in_lbs}</h6>
          <h6>Year: {carInfo[0].Year}</h6>
        </>
      ) : (
        <h6>loading...</h6>
      )}
    </div>
  );
};

export default Api;

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
          <ul
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start"
            }}
          >
            <h4>An example of a car object data for reference:</h4>
            <li>Acceleration: {carInfo[0].Acceleration}</li>
            <li>Cylinders: {carInfo[0].Cylinders}</li>
            <li>Displacement: {carInfo[0].Displacement}</li>
            <li>Horsepower: {carInfo[0].Horsepower}</li>
            <li>Miles_per_Gallon: {carInfo[0].Miles_per_Gallon}</li>
            <li>Name: {carInfo[0].Name}</li>
            <li>Origin: {carInfo[0].Origin}</li>
            <li>Weight_in_lbs: {carInfo[0].Weight_in_lbs}</li>
            <li>Year: {carInfo[0].Year}</li>
          </ul>
        </>
      ) : (
        <h6>loading...</h6>
      )}
    </div>
  );
};

export default Api;

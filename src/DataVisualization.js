import React from "react";
import * as tfvis from "@tensorflow/tfjs-vis";

const DataVisualization = ({ cleanedData }) => {
  const values = cleanedData.map(car => ({
    x: car.horsepower,
    y: car.mpg
  }));

  tfvis.render.scatterplot(
    { name: "Horsepower v MPG" },
    { values },
    {
      xLabel: "Horsepower",
      yLabel: "MPG",
      height: 300
    }
  );
  return <div></div>;
};

export default DataVisualization;

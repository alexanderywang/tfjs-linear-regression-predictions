import React from "react";
import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

const createModel = () => {
  // create sequential model
  const model = tf.sequential();
  // add single input layer
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
  // add output layer
  model.add(tf.layers.dense({ units: 1, useBias: true }));

  return model;
};

const Model = () => {
  const model = createModel();
  tfvis.show.modelSummary({ name: "Model Summary" }, model);

  return <div></div>;
};

export default Model;

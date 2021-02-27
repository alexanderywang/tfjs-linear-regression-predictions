import * as tf from "@tensorflow/tfjs";
import * as tfvis from "@tensorflow/tfjs-vis";

export const createModel = () => {
  // create sequential model
  const model = tf.sequential();
  // add single input layer
  model.add(tf.layers.dense({ inputShape: [1], units: 1, useBias: true }));
  // extra - add sigmoidal layer? interesting but seems less accurate
  // model.add(tf.layers.dense({ units: 50, activation: "sigmoid" }));
  // add output layer
  model.add(tf.layers.dense({ units: 1, useBias: true }));

  return model;
};

export const Model = () => {
  const model = createModel();
  tfvis.show.modelSummary({ name: "Model Summary" }, model);
  return model;
};

// export default { createModel, Model };

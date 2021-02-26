## Tensorflow JS Linear Regression

The Tensorflow.js tutorial uses script tag as the entry point for loading files. I'll install via npm and use Create React App and attempt to modularize where possible.
I'll refer and refactor the code from the two-dimensional linear regression tutorial on Tensorflow JS is found here:

https://codelabs.developers.google.com/codelabs/tfjs-training-regression#0

- Tensorflow.js allows you to run machine learning models in the browser for analysis and training.
- On the mobile device, you can have access to sensor data from cameras, microphone, accelerometer, etc. while maintaining user privacy.  All the data used stays on the client side. Added user privacy is a big plus for TFJS.

- TFJS uses WebGL to process and train the models and GPU acceleration for computation. The syntax for the APIs is tf.methodName() , a syntax familiar to JS users. Some utilize callback functions, some are asynchronous, some are synchronous. WebGL has no garbage collection. I've seen tf.tidy() used a lot for clean up and will try to utilize it or tf.dispose()

### Tensor:

Tensors are the data type widely used in Tensorflow and a tensor is a essentially a matrix of numbers used to represent multi-dimensional array. They are used to train prediction models through TFJS APIs and "flow" through the model.

### Goal:

The goal of this solution is to create a model that will predict miles per gallon (mpg) of a vehicle given horsepower from a dataset provided by google by using a linear regression prediction model with @tensorflow/tfjs and a graphing solution @tensorflow/tfjs-vis.

I'll define and train a model given a dataset and then input a horsepower that the model will output an mpg prediction. The API provided by good returns data that will have to be filtered and formatted for the model before training it

1. async/await get using Axios
2. create model
3. filter data for mpg and horsepower, format to tensors
4. async/await train model
5. predict

using @tensorflow/tfjs-vis for the scatterplot.
https://js.tensorflow.org/api_vis/latest/

Extra:

- create a retry function for promise based API calls to simulate potential throttling done by the provider
- There's a lot of tables, graphs, analysis available at @tensorflow/tfjs-vis
- some CSS would be nice

Tech Stack:

- Node.js
- React
- Tensorflow.js
- @tensorflow/tfjs-vis
- Axios

### Some key learning points

- data often needs to be filtered for relevant information
- data often needs to be checked for cleanliness -> some missing/null values can throw off models

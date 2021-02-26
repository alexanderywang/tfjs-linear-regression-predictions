## Tensorflow JS Linear Regression

The Tensorflow.js tutorial uses script tag as the entry point for loading files. I'll install via npm and use Create React App and attempt to modularize where possible.
I'll refer and refactor the code from the two-dimensional linear regression tutorial on Tensorflow JS is found here:

https://codelabs.developers.google.com/codelabs/tfjs-training-regression#0

- Tensorflow.js allows you to run machine learning models in the browser for analysis and training.
- On the mobile device, you can have access to sensor data from cameras, microphone, accelerometer, etc. while maintaining user privacy. All the data used stays on the client side. Added user privacy is a big plus for TFJS.

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
- @tensorflow/tfjs-vis https://www.npmjs.com/package/@tensorflow/tfjs-vis
- Axios

### Some key learning points

- data often needs to be filtered for relevant information
- data **needs** to be checked for cleanliness -> some missing/null values can throw off models
- prepping and formatting data correctly is likely a herculean task as the data set scales up

- Visualizing the data can give us a sense of whether there is any structure to the data that the model can learn.

- defining and creating the model:
- from tfjs: ML models are algorithms that take an input and produce an output. When using neural networks, the algorithm is a set of layers of neurons with ‘weights' (numbers) governing their output. The training process learns the ideal values for those weights.

1. instantiate the model. Using sequential since inputs flow straight down to output. other kinds of models can have branches or multiple inputs and outputs.
2. Add layers.
* dense layer is a type of layer that multiplies inputs by a matrix (called weights) and then adds a number (called bias) to the result. The bigger the data set, the better trained the weights are, the better the predictions
* inputShape is 1 because we have a 1 number as our input (the horsepower of a given car) units sets how big the weight matrix will be in the layer. 1 will be the weight for each input of the data. It is the dimensionailty of the data.
* Bias defaults to true. bias gets added to the weighted result.

- a layer is where you input tensors. Each layer takes the data and outputs a result within the tensor. In the sequential model, tensors flow through each layer. Previous layer determines the input to the next layer

- TFJS Note: In this example, because the hidden layer has 1 unit, we don't actually need to add the final output layer above (i.e. we could use hidden layer as the output layer). However, defining a separate output layer allows us to modify the number of units in the hidden layer while keeping the one-to-one mapping of input and output.

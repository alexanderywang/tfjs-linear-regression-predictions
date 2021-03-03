## Tensorflow JS Linear Regression

The Tensorflow.js tutorial uses script tag as the entry point for loading files. I'll install via npm and use Create React App and attempt to modularize where possible.
I'll refer and refactor the code from the two-dimensional linear regression tutorial on Tensorflow JS found here:

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

### Some additional Features on top of the tutorial
- React, React Hooks, functional components, pure functions, async/await, modern ES6 syntax
- Can take in a single horsepower input from user and return a prediction 
- Accepts a dynamic epoch parameter from the user to train the model and displayed in the tfvis visor while training
- functions are modularized and additional hidden layers are easy to add. A sigmoidal layer is added and commented out in the file

#### Extra:

- the tutorial runs a set of 100 example horsepower to test the model predictions. see if i can let user input a single horsepower and return a prediction. - check, but the predictions don't look that great
- create a retry function for promise based API calls to simulate potential throttling done by the provider
- There's a lot of tables, graphs, analysis available at @tensorflow/tfjs-vis. play around with some more
- some CSS would be nice, this is really, really bare bones :)
- try making epochs dynamic and see how many you need. - check, made with hooks
- improve the epoch adjustment by intergrating a reset, play, step buttons that reset, increment, and increment by 1
- try increasing number of units in the hidden layer. - check added a sigmoidal layer
- try adding more hidden layers in between the first hidden layer and the final output layer. something like:

```
model.add(tf.layers.dense({units: 50, activation: 'sigmoid'}));
```

- see if you can have a non-linear curve fit the data instead
- could be interesting to allow the user to match any inputs and output to see if there is a determinable and predictable relationship
- some things to think about testing in the future: learning rate, training a % of the data set and allowing user to adjust.
## Tech Stack:

- [Node.js](https://nodejs.org/en/)
- [React](https://facebook.github.io/react/)
- [Tensorflow.js](https://www.tensorflow.org/js/)
- [@tensorflow/tfjs-vis](https://www.npmjs.com/package/@tensorflow/tfjs-vis)
- [Axios](https://www.npmjs.com/package/axios)

## Local Setup

1. Run `git clone https://github.com/alexanderywang/tfjs-linear-regression-predictions` and navigate to the project folder
2. Run `npm install`
3. Run `npm run start` to start the app on http://localhost:3000/

### Some key learning points

![car object](/public/car_object.png)

- data often needs to be filtered for relevant information
- data **needs** to be checked for cleanliness -> some missing/null values can throw off models
- prepping and formatting data correctly is likely a herculean task as the data set scales up

- Visualizing the data can give us a sense of whether there is any structure to the data that the model can learn.
  ![Initial Data](/public/initial_data.png)

- defining and creating the model:
- from tfjs: ML models are algorithms that take an input and produce an output. When using neural networks, the algorithm is a set of layers of neurons with ‘weights' (numbers) governing their output. The training process learns the ideal values for those weights.

1. instantiate the model. Using sequential since inputs flow straight down to output. other kinds of models can have branches or multiple inputs and outputs.
2. Add layers.

- dense layer is a type of layer that multiplies inputs by a matrix (called weights) and then adds a number (called bias) to the result. The bigger the data set, the better trained the weights are, the better the predictions
- inputShape is 1 because we have a 1 number as our input (the horsepower of a given car) units sets how big the weight matrix will be in the layer. 1 will be the weight for each input of the data. It is the dimensionailty of the data.
- Bias defaults to true. bias gets added to the weighted result.

* a layer is where you input tensors. Each layer takes the data and outputs a result within the tensor. In the sequential model, tensors flow through each layer. Previous layer determines the input to the next layer

* TFJS Note: In this example, because the hidden layer has 1 unit, we don't actually need to add the final output layer above (i.e. we could use hidden layer as the output layer). However, defining a separate output layer allows us to modify the number of units in the hidden layer while keeping the one-to-one mapping of input and output.

#### Prepping data:

_Differential privacy_ is important to maintain. tensorflow has an optimizer to help with this, but maybe just for python?

**Best practice is to shuffle**

- shuffle randomizes the order of the examples. dataset gets broken into smaller subsets (batches) and shffling helps each batch have a variety of data. We don't want the model to learn in a way dependent on the order of the data or learn structures of subgrohps that don't apply across the entire dataset.

- tf.util.shuffle takes an array as the only input. If the data is millions of points, splitting data into batches will be better

- converting to tensors. make an array of x values (inputs, horsepower in this case) and an array of y values (labels, mpg in this case). Each array is converted to a 2D tensor. Each tensor is length x 1

**Best practice is to normalize**
From TFJS:

- We normalize the data. Here we normalize the data into the numerical range 0-1 using **min-max scaling**. Normalization is important because the internals of many machine learning models you will build with tensorflow.js are designed to work with numbers that are not too big. Common ranges to normalize data to include 0 to 1 or -1 to 1. You will have more success training your models if you get into the habit of normalizing your data to some reasonable range.

- You should always consider normalizing your data before training. Some datasets can be learned without normalization, but normalizing your data will often eliminate a whole class of problems that would prevent effective learning.

- You can normalize your data before turning it into tensors. We do it afterwards because we can take advantage of vectorization in TensorFlow.js to do the min-max scaling operations without writing any explicit for loops.

- We want to keep the values we used for normalization during training so that we can un-normalize the outputs to get them back into our original scale and to allow us to normalize future input data the same way.

formula:

```
x' = (x-min(x)) / (max(x) - min(x))
```

tensor methods .sub for subtraction and .div for division for min-max scaling formula:

```
inputTensor
      .sub(inputMin)
      .div(inputMax.sub(inputMin));
```

- this is faster than using vanilla JS

* when the model makes predicitons, the return will be in normalized form. To de-normalize to get the mpg prediction, we'll need the min and max tensor values. They are included in the tf.tidy() object returned.

```
return {
      inputs: normalizedInputs,
      labels: normalizedLabels,
      // Return the min/max bounds so we can use them later.
      inputMax,
      inputMin,
      labelMax,
      labelMin
    };
```

#### Training the model

- after prepping the input and output data into tensor objects, we can train the model given an input - horsepower - and true output -mpg. The model will calculate the weights and bias values of each layer and try to find the best weights that give the most accurate prediciton model. After training, it can make a prediction mpg once given another horsepower input.

- compiling the model: **optimizer** is the algorithm. adam is one. sgd (stochastic gradient descent) is another. adam is sort of like gradient descent but has less configuration and is recommended by TFJS. **loss** is a function that shows how well the model is learning on each batch, calculating the magnitude of the error. meanSquaredError (mse) compares predictions made by the model with true values.

- batchSize is size of each subset on each iteration of training. epochs is the number of times model going to look at each dataset. more is better

- model.fit is called to start the training. it is asynchronous. the callback generates functions that plot charts for the loss and mse metric and is optional.

- when done training, it's good to see the loss go down since loss is a measure of error.

![training](/public/training_and_test_model.png)

#### Making Predictions

- generating 100 new examples to feed to the model. Use model.predict, keeping the same shape ([num_examples, num_features_per_example]) as training.

- invert operations and de-normalize

- .dataSync() is a method we can use to get a typedarray of the values stored in a tensor. This allows us to process those values in regular JavaScript. This is a synchronous version of the .data() method which is generally preferred.

- plot data with tfvis

- unsure why singular prediction model spits out a negative number. ??

![User input](/public/user_input.png)

#### Takeaways

Formulate your task:

- Is it a regression problem or a classification one?
- Can this be done with supervised learning or unsupervised learning?
- What is the shape of the input data? What should the output data look like?

- epochs are now dynamic. running 500 does take more time than 50 but is interesting to see the model run
- sigmoidal layer creates some curve, but not a best fit curve. worth exploring here...

**Javascript in Machine Learning is relatively new and it's important that users can use your models and ideas interactively in the browser without having to install anything**

**CLIENT SIDE BENEFITS THAT ARE HARDER TO ACHIEVE SERVER SIDE:**
- Privacy is ensured
- Lower latency
- Lower cost
- Interactivity
- Reach and Scale

- a good introduction to deep learning is through linear regression

* how to decide the number of layer and nodes of memory intensive layers like LSTM? trial and error, run experiments, keras tuning can search through layers for optimizing

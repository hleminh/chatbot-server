const mongoose = require("mongoose");
const stepSchema = require("../schemas/step");
const Promise = require("bluebird");

const stepModel = mongoose.model("Step", stepSchema);

const getAllSteps = () => {
  return stepModel.find().exec();
};

const createNewStep = data => {
  console.log(data);
  return stepModel.create(data);
};

module.exports = {
  getAllSteps,
  createNewStep
};

const mongoose = require("mongoose");
const stepSetSchema = require("../schemas/stepSet");
const Promise = require("bluebird");
const vntk = require("vntk");
const classifier = new vntk.BayesClassifier();

const stepSetModel = mongoose.model("StepSet", stepSetSchema);

const getAllSets = () => {
  return stepSetModel
    .find()
    .populate("steps")
    .exec();
};

const createNewSet = data => {
  console.log(data);
  return stepSetModel.create(data);
};

const getSetByInput = input => {
  console.log("getSetByInput");
  return stepSetModel
    .find()
    .populate("steps")
    .lean()
    .exec()
    .then(doc => {
      for (item in doc) {
        for (input in doc[item].feature) {
          console.log("input:\n", doc[item].feature[input]);
          console.log("name:\n", doc[item].name);
          classifier.addDocument(doc[item].feature[input], doc[item].name);
        }
      }
      classifier.train();
      console.log("classifier trained\n");
      var pred = classifier.classify(input);
      console.log("pred:\n", pred);
      return pred;
    })
    .then(pred => {
      return stepSetModel
        .findOne({ name: pred })
        .populate("steps")
        .exec();
    })
    .then(set => {
      return Promise.all([
        new Promise((resolve, reject) => {
          resolve(set);
        }),
        stepSetModel
          .find({ name: { $ne: set.name } })
          .populate("steps")
          .exec()
      ]);
    });
};

const updateSetFeatureById = (id, input) => {
  return stepSetModel
    .findOne({ _id: id })
    .populate("steps")
    .exec()
    .then((doc, err) => {
      if (!doc.feature.includes(input)) doc.feature = doc.feature.concat(input);
      doc.save(err => {});
    })
    .then(() => {
      return Promise.all([
        stepSetModel
          .findOne({ _id: id })
          .populate("steps")
          .exec(),
        stepSetModel.find({ _id: { $ne: id } }).exec()
      ]);
    });
};

module.exports = {
  getAllSets,
  createNewSet,
  getSetByInput,
  updateSetFeatureById
};

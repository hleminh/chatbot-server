const express = require("express");
const Router = express.Router();

const stepModel = require("../models/step");
const stepSetModel = require("../models/stepSet");

Router.get("/steps", (req, res, next) => {
  stepModel
    .getAllSteps()
    .then(result => {
      res.status(200).json({
        steps: result
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

Router.post("/steps", (req, res, next) => {
  console.log(req.body);
  stepModel
    .createNewStep(req.body)
    .then(result => {
      res.status(200).json({});
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

Router.get("/sets", (req, res, next) => {
  stepSetModel
    .getAllSets()
    .then(result => {
      res.status(200).json({
        steps: result
      });
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

Router.get("/sets/:input", (req, res, next) => {
  console.log(req.params.input);
  stepSetModel
    .getSetByInput(req.params.input)
    .then(result => {
      console.log(result);
      res.status(200).json({
        set: result[0],
        survey: result[1]
      });
    })
    .catch(err => {
      console.log("err:\n", err);
      res.status(400).json({
        error: err
      });
    });
});

Router.post("/sets", (req, res, next) => {
  console.log(req.body);
  stepSetModel
    .createNewSet(req.body)
    .then(result => {
      res.status(200).json({});
    })
    .catch(err => {
      res.status(400).json({
        error: err
      });
    });
});

Router.post("/sets/:id", (req, res, next) => {
  console.log(req.body);
  stepSetModel
    .updateSetFeatureById(req.params.id, req.body.input)
    .then(result => {
      res.status(200).json({
        set: result[0],
        survey: result[1]
      });
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({
        error: err
      });
    });
});

module.exports = Router;

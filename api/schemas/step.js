const mongoose = require("mongoose");
require("mongoose-function")(mongoose);
const Schema = mongoose.Schema;

const stepSchema = new Schema({
  message: {
    type: String,
    require: true
  },
  action: {
    type: String
  },
  dataType: {
    type: String,
  }
});

module.exports = stepSchema;

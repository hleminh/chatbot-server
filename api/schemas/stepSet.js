const mongoose = require("mongoose");
require("mongoose-function")(mongoose);
const Schema = mongoose.Schema;

const stepSet = new Schema({
  name: {
    type: String,
    require: true
  },
  feature: {
    type: [String]
  },
  steps: [{
    type: Schema.Types.ObjectId,
    ref: 'Step'
  }]
});

module.exports = stepSet;

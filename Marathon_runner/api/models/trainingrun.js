var mongoose = require("mongoose");

var TrainingrunSchema = mongoose.Schema({
  title: String,
  location: String,
  distance: Number
});

module.exports = mongoose.model("Trainingrun", TrainingrunSchema);


var mongoose = require("mongoose");

var runSchema = mongoose.Schema({
  title: String,
  location: String,
  distance: Number
});

module.exports = mongoose.model("run", runSchema);


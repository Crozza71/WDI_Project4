var mongoose = require("mongoose");

var runSchema = mongoose.Schema({
  title: String,
  origin: { 
      lat: Number, 
      lng: Number 
  },
  destination: { 
      lat: Number, 
      lng: Number 
  },
  waypoints: [
    {
      location:{ 
        lat: Number, 
        lng: Number 
      }
    }
  ]
});

module.exports = mongoose.model("Run", runSchema);


var mongoose = require("mongoose");

var waypointSchema = mongoose.Schema({
  location:{ 
    lat: Number, 
    lng: Number 
  }
},{
  _id:false
});

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
  waypoints: [waypointSchema]
});

module.exports = mongoose.model("Run", runSchema);


var Trainingrun = require("../models/trainingrun");

function trainingrunIndex(req, res){
  Trainingrun.find({}, function(err, trainingrun) {
    if (err) return res.status(404).send(err);
    res.status(200).send(trainingrun);
  });
}

function trainingrunCreate(req, res){
  console.log("New" + req.body)
  var trainingrun = new Trainingrun(req.body.trainingrun);
  trainingrun.save(function(err, trainingrun) {
    if (err) return res.status(500).send(err);
    res.status(201).send(trainingrun);
  });
}

module.exports = {
  trainingrunIndex:  trainingrunIndex,
  trainingrunCreate: trainingrunCreate,
};

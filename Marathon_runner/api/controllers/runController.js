var run = require("../models/run");

function runIndex(req, res){
  run.find({}, function(err, run) {
    if (err) return res.status(404).send(err);
    res.status(200).send(run);
  });
}

function runCreate(req, res){
  console.log("New" + req.body)
  var run = new run(req.body.run);
  run.save(function(err, run) {
    if (err) return res.status(500).send(err);
    res.status(201).send(run);
  });
}

module.exports = {
  runIndex:  runIndex,
  runCreate: runCreate,
};

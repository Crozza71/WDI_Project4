var Run = require("../models/run");

function runIndex(req, res){
  Run.find({}, function(err, runs) {
    if (err) return res.status(404).send(err);
    res.status(200).send(runs);
  });
}

function runCreate(req, res){
  var run = new Run(req.body.run);
  console.log(run);
  run.save(function(err, run) {
    if (err) return res.status(500).send(err);
    res.status(201).send(run);
  });
}


function runUpdate(req, res){
  var run = req.params.run;
  Run.findByIdAndUpdate({ _id: id },
    req.body.run, function(err, user){
      if (err) return res.status(500).send(err);
      if (!user) return res.status(404).send(err);
      res.status(200).send(run);
    });
  }

  function runShow(req, res){
    Run.findById(req.params.id, function(err, run){
      if (err) return res.status(404).json({message: 'Something went wrong.'});
      res.status(200).json({ run: run });
    });
  }

  function runDelete(req, res) {
   Run.findByIdAndRemove(req.params.id, function(err) {
     if(err) return res.status(500).json({ message: err });
     return res.status(204).send();
   });
  }


  

module.exports = {
  runIndex:  runIndex,
  runCreate: runCreate,
  runShow : runShow,
  runUpdate : runUpdate,
  runDelete : runDelete
};

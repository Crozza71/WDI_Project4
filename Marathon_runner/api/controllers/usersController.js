var User = require("../models/user");

function usersIndex(req, res){
  User.find({}, function(err, users) {
    if (err) return res.status(404).send(err);
    res.status(200).send(users);
  });
}

function usersCreate(req, res){
  var user = new User(req.body.user);
  user.save(function(err, user) {
    if (err) return res.status(500).send(err);
    console.log(err)
    res.status(201).send(user);
  });
}

function usersShow(req, res){
  User.findById(req.params.id, function(err, user){
    if (err) return res.status(404).json({message: 'Something went wrong.'});
    res.status(200).json({ user: user });
  });
}

function usersUpdate(req, res){
  var id = req.params.id;

  User.findByIdAndUpdate({ _id: id }, req.body.user, function(err, user){
    if (err) return res.status(500).send(err);
    if (!user) return res.status(404).send(err);
    res.status(200).send(user);
  });
}

function usersDelete(req, res) {
 User.findByIdAndRemove(req.params.id, function(err) {
   if(err) return res.status(500).json({ message: err });
   return res.status(204).send();
 });
}

module.exports = {
  usersIndex:  usersIndex,
  usersCreate: usersCreate,
  usersShow:   usersShow,
  usersUpdate: usersUpdate,
  usersDelete: usersDelete
};

var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var trainingrunController = require('../controllers/trainingrunController');
var authenticationsController = require('../controllers/authenticationsController');

router.post('/login', authenticationsController.login);
router.post('/register', authenticationsController.register);

router.route('/')
  .get(usersController.usersIndex);

router.route('/users')
  .get(usersController.usersIndex);

router.route('/users/:id')
  .get(usersController.usersShow)
  .patch(usersController.usersUpdate)
  .delete(usersController.usersDelete);

router.route('/trainingrun')
  .get(trainingrunController.trainingrunIndex)
  .post(trainingrunController.trainingrunCreate)

module.exports = router;
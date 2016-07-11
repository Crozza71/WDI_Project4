var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var runController = require('../controllers/runController');
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

router.route('/run')
  .get(runController.runIndex)
  .post(runController.runCreate)

module.exports = router;

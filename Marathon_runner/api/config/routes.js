var express = require('express');
var router  = express.Router();

var usersController = require('../controllers/usersController');
var runController = require('../controllers/runController');
var authenticationsController = require('../controllers/authenticationsController');
var commentsController = require('../controllers/commentsController');

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
  .post(runController.runCreate);

router.route('/run/:id')
  .get(runController.runShow)
  .patch(runController.runUpdate)
  .delete(runController.runDelete);

// router.route('/comments')
//   .get(commentsController.commentsAll)
//   .post(commentsController.commentsCreate);




module.exports = router;

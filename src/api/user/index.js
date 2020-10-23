const router = require('express').Router();
const UserController = require('./controller');
const path = '/users';

// >> Here will be the
// definition of the routes.
router.get('/me', UserController.getUser);



router.post('', UserController.saveUser);

module.exports = {
  path,
  router,
}
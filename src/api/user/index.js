const router = require('express').Router();
const UserController = require('./controller');
const path = '/users';
const verifyToken = require('../../services/middlewares');

// >> Here will be the
// definition of the routes.

router.get('/me', verifyToken, UserController.getUser);

router.post('/signin', UserController.signInUser);

router.post('', UserController.saveUser);

module.exports = {
  path,
  router,
}
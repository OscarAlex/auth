const router = require('express').Router();
const {getUser, saveUser} = require('./controller');
const path = '/users';

// >> Here will be the
// definition of the routes.
router.get('', getUser);
//router.save(path, UserController.save);
router.post('', saveUser);

module.exports = {
  path,
  router,
}
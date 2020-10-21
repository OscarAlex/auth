const { Router } = require('express');
// >> Here will be the APIs
// importation ('require').
//
// A) Uncomment this line:
const main = require('./main');
const user = require('./user');
const router = new Router()
//const router2 = new Router()
// >> Here will be the APIs
// registration
//
// A) Uncomment this line:
router.use(main.path, main.router)
router.use(user.path, user.router)

module.exports = router;

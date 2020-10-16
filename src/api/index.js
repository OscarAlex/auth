const { Router } = require('express');
// >> Here will be the APIs
// importation ('require').
//
// A) Uncomment this line:
const main = require('./main');

const router = new Router()

// >> Here will be the APIs
// registration
//
// A) Uncomment this line:
router.use(main.path, main.router)

module.exports = router;

var express = require('express'),
    router = express.Router(),
    filtersController = require('../controllers/filtersController'),
    access_users = require('../../middleware/access_users');


router.post('/filterss', access_users.authentication, filtersController.create);
router.get('/filterss', access_users.authentication, filtersController.read )
router.get('/filterss/:id', access_users.authentication, filtersController.readAll);
router.put('/filterss/:id', access_users.authentication, filtersController.update);
router.delete('/filterss/:id', access_users.authentication, filtersController.delete);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router; 

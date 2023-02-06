var express = require('express'),
    router = express.Router(),
    configsController = require('../controllers/configsController'),
    access_users = require('../../middleware/access_users');


router.post('/configss', access_users.authentication, configsController.create);
router.get('/configss', access_users.authentication, configsController.read )
router.get('/configss/:id', access_users.authentication, configsController.readAll);
router.put('/configss/:id', access_users.authentication, configsController.update);
router.delete('/configss/:id', access_users.authentication, configsController.delete);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router; 

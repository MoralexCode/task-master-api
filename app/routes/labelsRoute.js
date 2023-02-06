var express = require('express'),
    router = express.Router(),
    labelsController = require('../controllers/labelsController'),
    access_users = require('../../middleware/access_users');


router.post('/labelss', access_users.authentication, labelsController.create);
router.get('/labelss', access_users.authentication, labelsController.read )
router.get('/labelss/:id', access_users.authentication, labelsController.readAll);
router.put('/labelss/:id', access_users.authentication, labelsController.update);
router.delete('/labelss/:id', access_users.authentication, labelsController.delete);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router; 

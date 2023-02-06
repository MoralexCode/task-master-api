var express = require("express"),
  router = express.Router(),
  routinesController = require("../controllers/routinesController"),
  access_users = require("../../middleware/access_users");

router.post(
  "/routines",
  access_users.authentication,
  routinesController.create
);
router.get(
  "/routines",
  access_users.authentication,
  routinesController.readAll
);
router.get(
  "/routines/:id",
  access_users.authentication,
  routinesController.read
);
router.put(
  "/routines/:id",
  access_users.authentication,
  routinesController.update
);
router.delete(
  "/routines/:id",
  access_users.authentication,
  routinesController.delete
);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router;

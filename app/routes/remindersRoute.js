var express = require("express"),
  router = express.Router(),
  remindersController = require("../controllers/remindersController"),
  access_users = require("../../middleware/access_users");

router.post(
  "/reminders",
  access_users.authentication,
  remindersController.create
);
router.get(
  "/reminders",
  access_users.authentication,
  remindersController.readAll
);
router.get(
  "/reminders/:id",
  access_users.authentication,
  remindersController.read
);
router.put(
  "/reminders/:id",
  access_users.authentication,
  remindersController.update
);
router.delete(
  "/reminders/:id",
  access_users.authentication,
  remindersController.delete
);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router;

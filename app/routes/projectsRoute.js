var express = require("express"),
  router = express.Router(),
  projectsController = require("../controllers/projectsController"),
  access_users = require("../../middleware/access_users");

router.post(
  "/projects",
  access_users.authentication,
  projectsController.create
);
router.get(
  "/projects",
  access_users.authentication,
  projectsController.readAll
);
router.get(
  "/projects/:id",
  access_users.authentication,
  projectsController.read
);
router.put(
  "/projects/:id",
  access_users.authentication,
  projectsController.update
);
router.delete(
  "/projects/:id",
  access_users.authentication,
  projectsController.delete
);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router;

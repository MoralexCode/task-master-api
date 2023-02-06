var express = require("express"),
  router = express.Router(),
  tasksController = require("../controllers/tasksController"),
  access_users = require("../../middleware/access_users");

router.post("/tasks", access_users.authentication, tasksController.create);
router.get("/tasks", access_users.authentication, tasksController.readAll);
router.get("/tasks/:id", access_users.authentication, tasksController.read);
router.put("/tasks/:id", access_users.authentication, tasksController.update);
router.delete(
  "/tasks/:id",
  access_users.authentication,
  tasksController.delete
);

//endoint by QueryString
// ........
//...HERE..
///........
module.exports = router;

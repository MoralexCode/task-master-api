var express = require("express");
var app = express();

const reminders = require("./remindersRoute");
const users = require("./usersRoute");
const tasks = require("./tasksRoute");
const projects = require("./projectsRoute");
const routines = require("./routinesRoute");
app.use("/v1", reminders); //ALL CREDENTIALS  ENDPOINT
app.use("/v1", users); //
app.use("/v1", tasks); //
app.use("/v1", projects); //
app.use("/v1", routines); //

module.exports = app;

const supertest = require("supertest");
const assert = require("assert");
const { app, server } = require("../task-master");
const api = supertest(app);
const { credentials, contentType } = require("./helper");
const auth = {};
const routine = {
  title: "Ejercitarme",
  description: "Correr 5 KM todos los dias",
  when: "2022-10-28 23:40:20",
};
//login to get auth token
beforeEach(async () => {
  await api
    .post("/api/v1/login")
    .send(credentials)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      auth.token = response.body.data.token;
    });
});

test("Create a new Routine", async () => {
  await api
    .post("/api/v1/routines")
    .set("Authorization", auth.token)
    .send(routine)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data.title, routine.title);
      routine.id = response.body.data.id;
    });
});

test("Create a new Routine with reminder_id", async () => {
  const reminders = {
    interval: {
      time: "80:30 AM",
      start: "2022-10-29",
      end: "2222-10-29",
      each: "day",
    },
  };
  await api
    .post("/api/v1/reminders")
    .set("Authorization", auth.token)
    .send(reminders)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data.interval.each, reminders.interval.each);
      reminders.id = response.body.data.id;
    });

  const routine = {
    title: "Ejercitarme",
    description: "Correr 5 KM todos los dias",
    when: "2022-10-28 23:40:20",
    reminder_id: reminders.id,
  };

  await api
    .post("/api/v1/routines")
    .set("Authorization", auth.token)
    .send(routine)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data.title, routine.title);
    });
});
test("Get a  Routine", async () => {
  await api
    .get("/api/v1/routines/" + routine.id)
    .set("Authorization", auth.token)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data.title, routine.name);
    });
});
test("Update a Routine", async () => {
  await api
    .put("/api/v1/routines/" + routine.id)
    .set("Authorization", auth.token)
    .send({ title: "Correr" })
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data, "The update was successfully.");
    });
});
test("Delete a Routine", async () => {
  await api
    .delete("/api/v1/routines/" + routine.id)
    .set("Authorization", auth.token)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data, "This was deleted successfully.");
    });
});

afterEach(async () => {
  await server.close();
});

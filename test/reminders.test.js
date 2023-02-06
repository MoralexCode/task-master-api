const supertest = require("supertest");
const assert = require("assert");
const { app, server } = require("../task-master");
const api = supertest(app);
const auth = {};
const { credentials, contentType } = require("./helper");
//login to get auth token
beforeEach(async () => {
  await api
    .post("/api/v1/login")
    .send(credentials)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      auth.token = response.body.data.token;
      //   assert(response.body.data.mensaje, "Correct authentication");
    });
});

test("List all reminders", async () => {
  await api
    .get("/api/v1/reminders")
    .set("Authorization", auth.token)
    .expect(200)
    .expect("Content-Type", contentType);
});

test("create a reminder", async () => {
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
    });
});

test("Get a reminder", async () => {
  const reminders = {
    interval: {
      time: "80:30 AM",
      start: "2022-10-29",
      end: "2222-10-29",
      each: "day",
    },
  };
  const reminder_id = await api
    .post("/api/v1/reminders")
    .set("Authorization", auth.token)
    .send(reminders)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      return response.body.data.id;
    });

  await api
    .get("/api/v1/reminders/" + reminder_id)
    .set("Authorization", auth.token)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data.interval.each, reminders.interval.each);
    });
});

test("Update a reminder", async () => {
  const reminders = {
    interval: {
      time: "80:30 AM",
      start: "2022-10-29",
      end: "2222-10-29",
      each: "day",
    },
  };
  const reminder_id = await api
    .post("/api/v1/reminders")
    .set("Authorization", auth.token)
    .send(reminders)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      return response.body.data.id;
    });

  await api
    .put("/api/v1/reminders/" + reminder_id)
    .set("Authorization", auth.token)
    .send({
      interval: {
        time: "9:30 AM",
        each: "week",
      },
    })
    .expect(200)
    .expect("Content-Type", contentType)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data, "The update was successfully.");
    });
});

test("Delete a reminder", async () => {
  const reminders = {
    interval: {
      time: "80:30 AM",
      start: "2022-10-29",
      end: "2222-10-29",
      each: "day",
    },
  };
  const reminder_id = await api
    .post("/api/v1/reminders")
    .set("Authorization", auth.token)
    .send(reminders)
    .expect(200)
    .expect("Content-Type", contentType)
    .then((response) => {
      return response.body.data.id;
    });

  await api
    .delete("/api/v1/reminders/" + reminder_id)
    .set("Authorization", auth.token)
    .expect(200)
    .expect("Content-Type", contentType)
    .expect("Content-Type", contentType)
    .then((response) => {
      assert(response.body.data, "This was deleted successfully.");
    });
});

afterEach(async () => {
  await server.close();
});

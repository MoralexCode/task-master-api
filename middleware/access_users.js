var express = require("express"),
  app = express(),
  jwt = require("jsonwebtoken"),
  Util = require("../utils/util");
//config = require('../config/key_jwt')
const access_users = {};
//app.set('key_access', config.llave);
const ENV = process.env; // set environment variables
app.set("jtw_key", ENV.JWT_KEY);
app.set("public_key", ENV.JWT_PUBLIC_KEY);
app.set("private_key", ENV.JWT_PRIVATE_KEY);

access_users.getToken = ({ name, email, user_id, first_time } = datauser) => {
  const payload = {
    check: true,
    dataUser: {
      name,
      email,
      user_id,
      first_time,
    },
  };

  const token = jwt.sign(payload, app.get("jtw_key"), {
    expiresIn: "30 days",
  });

  return {
    mensaje: "Correct authentication",
    token: token,
    dataUser: payload.dataUser,
  };
};

access_users.distroyToken = (req) => {
  const token = req.headers["authorization"];
  //jwt.destroy(token)
  log("Usuario deslogeado", { message: "Usuario deslogeado", token });
  return true;
};

access_users.authentication = (req, res, next) => {
  let method =
    req.route.stack.length > 1 ? req.route.stack[0].method : " unknow ";
  //log('access user ' + req.route.stack[0].method, req.route)
  log("HHTP Method | " + method.toUpperCase() + " | Route  ", req.route.path);
  logger(
    "HHTP Method | " + method.toUpperCase() + " | Route | " + req.route.path
  );
  const token = req.headers["authorization"];
  if (token) {
    jwt.verify(token, app.get("jtw_key"), (error, decoded) => {
      if (error) {
        return Util.errorMessage(res, error, "Invalid token", 401);
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    Util.errorMessage(
      res,
      "Error: you need a correct token",
      "No token provided ",
      401
    );
  }
};

module.exports = access_users;

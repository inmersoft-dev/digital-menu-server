const express = require("express");
// chalk
const { error, log, info, good } = require("../utils/chalk");
const { login, register } = require("../utils/auth/functions");

const router = express.Router();

const load = require("../utils/loading");

router.post("/login", async (req, res) => {
  log(info("Logging user"));
  load.start();
  try {
    const { user, password } = req.body;
    const result = await login(user, password);
    load.stop();
    if (result.error == undefined) {
      log(good(`${user} logged successful`));
      res.send(result);
    } else {
      log(error(result.error));
      res.send({ error: result.error });
    }
  } catch (err) {
    load.stop();
    log(error(err));
    res.sendStatus(500);
  }
});

router.post("/register", async (req, res) => {
  log(info("Registering user"));
  load.start();
  try {
    const { user, password } = req.body;
    const result = await register(user, password);
    load.stop();
    if (result.error == undefined) {
      log(good(`${user} registered successful`));
      res.send(result);
    } else {
      log(error(result.error));
      res.send({ error: result.error });
    }
  } catch (err) {
    load.stop();
    log(error(err));
    res.sendStatus(500);
  }
});

module.exports = router;

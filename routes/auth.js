const express = require("express");
// chalk
const { error, log, info, good } = require("../utils/chalk");
const { login, register, save } = require("../utils/auth/functions");

const router = express.Router();

// auth
const { verifyBearer } = require("../utils/secure");

// pages
const { notFound } = require("../utils/pages");

const load = require("../utils/loading");

router.post("/validate", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        load.start();
        try {
          load.stop();
          res.send({ status: 200, data: { message: "authorized" } });
          return;
        } catch (err) {
          load.stop();
          log(error(err));
          res.sendStatus(500);
          return;
        }
      }
    }
  }
  res.send({ status: 200, data: { error: "unauthorized" } });
});

router.post("/save", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        log(info("Saving profile"));
        load.start();
        try {
          const { user, menuName, menuDescription, photo } = req.body;
          const result = await save(user, menuName, menuDescription, photo);
          load.stop();
          if (result.status === 200) {
            log(good(`${user} logged successful`));
            res.send(result);
          } else if (result.status === 422) {
            log(error(`${user} ${result.data.error}`));
            res.send(result);
          } else {
            log(error(result.error));
            res.send({ error: result.error });
          }
          return;
        } catch (err) {
          load.stop();
          log(error(err));
          res.sendStatus(500);
          return;
        }
      }
    }
  }
  res.send(notFound(req.baseUrl, "POST")).status(404);
});

router.post("/login", async (req, res) => {
  log(info("Logging user"));
  load.start();
  try {
    const { user, password } = req.body;
    const result = await login(user, password);
    load.stop();
    if (result.status === 200) {
      log(good(`${user} logged successful`));
      res.send(result);
    } else if (result.status === 422) {
      log(error(`${user} ${result.data.error}`));
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
    if (result.status === 200) {
      log(good(`${user} registered successful`));
      res.send(result);
    } else if (result.status === 422) {
      log(error(`${user} ${result.data.error}`));
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

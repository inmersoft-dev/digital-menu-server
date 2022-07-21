const express = require("express");
// chalk
const { error, log, info, good } = require("../utils/chalk");
const { save, fetch, fetchAll } = require("../utils/menu/functions");

const router = express.Router();

// auth
const { verifyBearer } = require("../utils/secure");

// pages
const { notFound } = require("../utils/pages");

const load = require("../utils/loading");

router.post("/save", async (req, res) => {
  if (req.headers.authorization) {
    if (req.headers.authorization.indexOf("Bearer ") === 0) {
      const verified = verifyBearer(req.headers.authorization);
      if (verified) {
        log(info("Saving menu"));
        load.start();
        try {
          const { user, menuName, menu, types } = req.body;
          const result = await save(user, menuName, menu, types);
          load.stop();
          if (result.error == undefined) {
            log(good(`${menuName} from ${user} saved successful`));
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
      }
    }
  }
  res.send(notFound(req.baseUrl, "POST")).status(404);
});

router.get("/fetch", async (req, res) => {
  log(info("Fetching menu"));
  load.start();
  try {
    const { user, menuName } = req.query;
    const result = await fetch(user, menuName);
    load.stop();
    if (result.error == undefined) {
      log(good(`${menuName} from ${user} fetched successful`));
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

router.get("/", async (req, res) => {
  log(info("Fetching all menus"));
  load.start();
  try {
    const result = await fetchAll();
    load.stop();
    if (result.error == undefined) {
      log(good(`all menus fetched successful`));
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

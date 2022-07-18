const express = require("express");
// chalk
const { error, log, info, good } = require("../utils/chalk");
const { save, fetch } = require("../utils/auth/functions");

const router = express.Router();

const load = require("../utils/loading");

router.post("/save", async (req, res) => {
  log(info("Saving menu"));
  load.start();
  try {
    const { user, menuName, menu } = req.body;
    const result = await save(user, menuName, menu);
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
});

router.get("/fetch", async (req, res) => {
  log(info("Fetching menu"));
  load.start();
  try {
    const { user, menuName } = req.body;
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

module.exports = router;

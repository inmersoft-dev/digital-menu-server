const express = require("express");
// chalk
const { error, log } = require("../utils/chalk");
const { login } = require("../utils/auth/functions");

const router = express.Router();

const load = require("../utils/loading");

//return all data
router.post("/login", async (req, res) => {
  load.start();
  try {
    const { user, password } = req.body;
    const result = await login(user, password);
    if (result.error == undefined) res.send(result);
    else res.send({ error: result.error });
  } catch (err) {
    log(error(err));
    res.sendStatus(500);
  }
  load.stop();
});

module.exports = router;

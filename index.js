const express = require("express");
const bodyParser = require("body-parser");

const {
  helmet,
  cors,
  limiter,
  // favicon,
  morgan,
} = require("./utils/middlewares");

const app = express();

// middle wares
// morgan
app.use(morgan.assignId);
app.use(morgan.structure);
app.use(morgan.dev);
// helmet
app.use(helmet);
// cors
app.use(cors);
// limiter
// app.use(limiter); //  apply to all requests
// favicon
// app.use(favicon);

app.use(express.json({ limit: 1048576 }));
app.use(express.urlencoded({ extended: false }));

// routes
const auth = require("./routes/auth");
const menu = require("./routes/menu");
app.use("/api/user/", auth);
app.use("/api/menu/", menu);

module.exports = app;

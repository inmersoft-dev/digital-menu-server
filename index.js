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

// imagekit config
const ImageKit = require("imagekit");
const config = require("./config");

const imagekit = new ImageKit({
  urlEndpoint: config.imagekitUrl,
  publicKey: config.imagekitPublicKey,
  privateKey: config.imagekitPrivateKey,
});

// * imagekit config
app.get("/auth", function (req, res) {
  var result = imagekit.getAuthenticationParameters();
  console.log(result);
  res.send(result);
});
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

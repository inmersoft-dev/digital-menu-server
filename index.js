const express = require("express");
const bodyParser = require("body-parser");
const uuid = require("node-uuid");
const crypto = require("crypto");

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
  var token = req.query.token || uuid.v4();
  var expire = req.query.expire || parseInt(new Date().getTime() + 10000);
  console.log(new Date().getTime());
  var privateAPIKey = "your_private_key";
  var signature = crypto
    .createHmac("sha1", privateAPIKey)
    .update(token + expire)
    .digest("hex");
  console.log(result);
  console.log({ token: token, expire: expire, signature: signature });
  res.send({ token: token, expire: expire, signature: signature });
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
const { UploadFile } = require("./db/storage");
app.use("/api/user/", auth);
app.use("/api/menu/", menu);

module.exports = app;

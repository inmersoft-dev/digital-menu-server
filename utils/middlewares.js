// middle wares
const morgan = require("morgan");
const helmet = require("helmet");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const favicon = require("serve-favicon");

// path
const path = require("path");

// uuid
const uuid = require("node-uuid");

// morgan
morgan.token("id", function getId(req) {
  return req.id;
});

const structure = morgan(":id :method :url :response-time");

const dev = morgan("dev", {
  skip: function (req, res) {
    return res.status < 400;
  },
});

const assignId = (req, res, next) => {
  req.id = uuid.v4();
  next();
};

// limiter
const mLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message:
    "Too many accounts created from this IP, please try again after a minute",
});

// cors white list
const whitelist = ["http//localhost:8000"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whitelist.indexOf(origin) === -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

// favicon
const fav = favicon(path.join(__dirname, "../public", "favicon.ico"));

module.exports = {
  morgan: { assignId, structure, dev },
  helmet: helmet(),
  cors: cors(corsOptions),
  limiter: mLimiter,
  favicon: fav,
};

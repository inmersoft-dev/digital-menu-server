const keys = require("../keys");

const verifyBearer = (auth) => {
  const credentials = auth.split(" ")[1];
  const base64 = Buffer.from(credentials, "base64").toString();
  if (keys.indexOf(base64) > -1) return true;
  return false;
};

module.exports = {
  verifyBearer,
};

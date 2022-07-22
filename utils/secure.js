const keys = [];

const verifyBearer = (auth) => {
  const credentials = auth.split(" ")[1];
  if (keys.indexOf(credentials) > -1) return true;
  return false;
};

const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

module.exports = {
  verifyBearer,
  keys,
  headers,
};

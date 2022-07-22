const keys = [];

const verifyBearer = (auth) => {
  const credentials = auth.split(" ")[1];
  if (keys.indexOf(credentials) > -1) return true;
  return false;
};

module.exports = {
  verifyBearer,
  keys,
};

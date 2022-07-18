const { users } = require("../users/users");

// users
const db = require("../files/user.json");

const verifyBasic = (auth) => {
  const credentials = auth.split(" ")[1];
  const base64 = Buffer.from(credentials, "base64").toString();

  const [user, pwd] = base64.split(":");
  let ok = false;
  Object.keys(users).forEach((item) => {
    if (user === item && pwd === users[item]) ok = user;
  });
  return ok;
};

const validateUser = (user, pwd) => {
  const filtered = db.users.filter((item) => {
    if (item.id === user) return item;
    return null;
  });
  // user exists
  if (filtered.length) {
    if (filtered[0].pwd === pwd) return 1;
    return 0;
  }
  return -1;
};

module.exports = {
  verifyBasic,
  validateUser,
};

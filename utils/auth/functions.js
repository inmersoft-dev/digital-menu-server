const { GetValue, Insert } = require("../../db/local");

const login = async (user, password) => {
  let theUser = {};
  try {
    const data = GetValue("users", user.toLowerCase());
    if (data !== undefined) {
      theUser.n = data.n;
      theUser.p = data.p;
      theUser.m = data.m;
      if (theUser.p.toLowerCase() === password.toLowerCase())
        return {
          status: 200,
          data: {
            user,
            m: theUser.m,
          },
        };
      else return { status: 422, data: { error: "wrong password" } };
    }
    return { status: 422, data: { error: "not found" } };
  } catch (err) {
    return { error: String(err) };
  }
};

const register = async (user, password) => {
  try {
    const data = GetValue("users", user.toLowerCase());
    if (data !== undefined) {
      Insert("users", user.toLowerCase(), { user, password });
      return {
        status: 200,
        data: {
          user,
        },
      };
    }
    return { status: 422, data: { error: "username taken" } };
  } catch (err) {
    return { error: String(err) };
  }
};

module.exports = {
  login,
  register,
};

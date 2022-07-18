// @ts-check

const uuid = require("node-uuid");

const { GetValue, Insert } = require("../../db/local");

/**
 *
 * @param {string} user
 * @param {string} password
 * @returns user data
 */
const login = async (user, password) => {
  let theUser = {};
  try {
    const data = GetValue("users", user.toLowerCase());
    if (data !== undefined) {
      const date = new Date();
      const stringDate = `${date.getFullYear()}-${
        date.getMonth() + 1
      }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}}`;
      theUser.n = data.n;
      theUser.p = data.p;
      theUser.m = data.m;
      if (theUser.p.toLowerCase() === password.toLowerCase())
        return {
          status: 200,
          data: {
            user,
            m: theUser.m,
            token: uuid.v4(),
            expiration: stringDate,
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
    if (data === undefined) {
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

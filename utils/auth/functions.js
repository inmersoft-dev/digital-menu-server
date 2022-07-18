// @ts-check

const uuid = require("node-uuid");

const { GetValue, Insert } = require("../../db/local");

const giveToken = () => {
  const date = new Date();
  const stringDate = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  return stringDate;
};

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
      theUser.p = data.p;
      theUser.m = data.m;
      if (theUser.p.toLowerCase() === password.toLowerCase())
        return {
          status: 200,
          data: {
            user,
            m: theUser.m,
            token: uuid.v4(),
            expiration: giveToken(),
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
      Insert("users", user.toLowerCase(), { u: user, p: password });
      return {
        status: 200,
        data: {
          user,
          token: uuid.v4(),
          expiration: giveToken(),
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

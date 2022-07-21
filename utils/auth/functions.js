// @ts-check

const uuid = require("node-uuid");

const { GetValue, Insert, Update } = require("../../db/local");

const { keys } = require("../secure");

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
      if (theUser.p.toLowerCase() === password.toLowerCase()) {
        const token = Buffer.from(uuid.v4()).toString("base64");
        // @ts-ignore
        keys.push(token);
        return {
          status: 200,
          data: {
            user,
            m: theUser.m,
            token,
            expiration: giveToken(),
          },
        };
      } else return { status: 422, data: { error: "wrong password" } };
    }
    return { status: 422, data: { error: "not found" } };
  } catch (err) {
    return { error: String(err) };
  }
};

/**
 *
 * @param {string} user
 * @param {string} password
 * @returns user data
 */
const register = async (user, password) => {
  try {
    const data = GetValue("users", user.toLowerCase());
    if (data === undefined) {
      Insert("users", user.toLowerCase(), { u: user, p: password, m: user });
      const token = Buffer.from(uuid.v4()).toString("base64");
      // @ts-ignore
      keys.push(token);
      return {
        status: 200,
        data: {
          user,
          token,
          expiration: giveToken(),
        },
      };
    }
    return { status: 422, data: { error: "username taken" } };
  } catch (err) {
    return { error: String(err) };
  }
};

/**
 *
 * @param {string} user
 * @param {string} menuName
 * @param {string} menuDescription
 * @param {string} photo
 * @returns user data
 */
const save = async (user, menuName, menuDescription, photo) => {
  try {
    let userData = GetValue("users", user.toLowerCase());
    userData = { ...userData, m: menuName, d: menuDescription, ph: photo };
    Update("users", user.toLocaleLowerCase(), userData);
    return {
      status: 200,
      data: {
        user,
        menuName,
        menuDescription,
        photo,
      },
    };
  } catch (err) {
    return { error: String(err) };
  }
};

module.exports = {
  login,
  register,
  save,
};

// @ts-check

const { GetValue, Update } = require("../../db/local");

/**
 *
 * @param {string} user
 * @param {string} menuName
 * @param {object[]} menu
 * @returns menu data
 */
const save = async (user, menuName, menu, types) => {
  try {
    const userData = GetValue("users", user.toLowerCase());
    userData.m = { m: menuName, l: menu, t: types };
    Update("users", user.toLocaleLowerCase(), userData);
    return { status: 200, data: { u: user, m: menuName, l: menu, t: types } };
  } catch (err) {
    return { error: String(err) };
  }
};

/**
 *
 * @param {string} user
 * @param {string} menuName
 * @returns menu data
 */
const fetch = async (user, menuName) => {
  try {
    console.log(user, menuName);
    const userData = GetValue("users", user.toLowerCase());
    const menu = userData.m;
    const types = userData.t;
    return {
      status: 200,
      data: { u: user, m: menuName, t: types, l: menu },
    };
  } catch (err) {
    return { error: String(err) };
  }
};

module.exports = {
  save,
  fetch,
};

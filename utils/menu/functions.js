// @ts-check

const { GetValue, Update } = require("../../db/local");

/**
 *
 * @param {string} user
 * @param {string} menuName
 * @param {object[]} menu
 * @returns menu data
 */
const save = async (user, menuName, menu) => {
  try {
    const userData = GetValue("users", user.toLowerCase());
    userData.m = { n: menuName, l: menu };
    Update("users", user.toLocaleLowerCase(), userData);
    return { status: 200, data: { u: user, m: menuName, menu } };
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
    return { status: 200, data: { u: user, m: menuName, menu } };
  } catch (err) {
    return { error: String(err) };
  }
};

module.exports = {
  save,
  fetch,
};

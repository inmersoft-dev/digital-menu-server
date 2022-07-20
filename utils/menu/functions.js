// @ts-check

const { GetValue, Update, GetTable } = require("../../db/local");

/**
 *
 * @param {string} user
 * @param {string} menuName
 * @param {object[]} menu
 * @param {string[]} types
 * @returns menu data
 */
const save = async (user, menuName, menu, types) => {
  try {
    let userData = GetValue("users", user.toLowerCase());
    userData = { ...userData, m: menuName, l: menu, t: types };
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
    const userData = GetValue("users", user.toLowerCase());
    const menu = userData.l;
    const types = userData.t;
    return {
      status: 200,
      data: {
        u: user,
        m: menuName,
        t: types,
        l: menu,
        ph: userData.ph,
        d: userData.d,
      },
    };
  } catch (err) {
    return { error: String(err) };
  }
};

/**
 *
 * @returns all menus data
 */
const fetchAll = async () => {
  try {
    const users = GetTable("users");
    return {
      status: 200,
      data: {
        u: users,
      },
    };
  } catch (err) {
    return { error: String(err) };
  }
};

module.exports = {
  save,
  fetch,
  fetchAll,
};

// @ts-check

const { GetValue, Update, GetTable } = require("../../db/controller");

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
    let userData = await GetValue("users", user.toLowerCase());
    // @ts-ignore
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
// @ts-ignore
const fetch = async (user, menuName) => {
  try {
    const userData = await GetValue("users", user.toLowerCase());
    // @ts-ignore
    const menu = userData.l;
    // @ts-ignore
    const types = userData.t;
    return {
      status: 200,
      data: {
        u: user,
        // @ts-ignore
        m: userData.m,
        t: types,
        l: menu,
        // @ts-ignore
        ph: userData.ph,
        // @ts-ignore
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
    const users = await GetTable("users");
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

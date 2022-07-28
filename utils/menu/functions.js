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
    if (userData) {
      const { m, l, ph, t, d } = userData;
      return {
        status: 200,
        data: {
          u: user,
          m, // menu - name
          t, // menu - types
          l, // menu - list
          ph, // menu - photo
          d, // menu - description
        },
      };
    }
    return { error: "not found" };
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

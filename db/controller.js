const firebase = require("./remote");

const db = firebase.firestore();

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Insert = async (table, key, value) => {
  await db.collection(table).doc(key).set(value);
};

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Update = async (table, key, value) => {
  await db
    .collection(table)
    .doc(key)
    .update({ ...value });
};

/**
 * @param {string} table
 * @param {string} key
 */
const GetValue = async (table, key) => {
  const localTable = await db.collection(table).doc(key).get();
  const localData = localTable.data();
  return localData;
};

/**
 * @param {string} table
 */
const GetTable = async (table) => {
  let resultList = [];
  const localTable = await db.collection(table).get();
  localTable.forEach((doc) => {
    const localData = doc.data();
    resultList.push(localData);
  });
  return resultList;
};

module.exports = {
  Insert,
  GetValue,
  GetTable,
  Update,
};

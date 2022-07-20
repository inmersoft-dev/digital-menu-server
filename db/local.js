// @ts-check
var JSONMGR = require("json-manager");
var json = new JSONMGR({
  dir: "./db",
  target: "db.json",
  watch: true,
  autoSave: true,
});

json.init();

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Insert = (table, key, value) => {
  let localTable = json.get(table);
  if (localTable) localTable[key] = value;
  else {
    localTable = {};
    localTable[key] = value;
  }
  json.set(table, localTable);
  json.save();
};

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Update = (table, key, value) => {
  let localTable = json.get(table);
  if (localTable) localTable[key] = value;
  else {
    localTable = {};
    localTable[key] = value;
  }
  json.set(table, localTable);
  json.save();
};

/**
 * @param {string} table
 * @param {string} key
 */
const GetValue = (table, key) => {
  const localTable = json.get(table);
  if (localTable) return json.get(table)[key];
  return undefined;
};

/**
 * @param {string} table
 */
const GetTable = (table) => {
  const localTable = json.get(table);
  if (localTable) return json.get(table);
  return undefined;
};
module.exports = {
  Insert,
  GetValue,
  GetTable,
  Update,
};

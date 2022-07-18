// users
const db = require("../files/user.json");

const fetchDataFromDb = (what, security) => {
  const data = db[what];
  const result = [];
  if (data) {
    if (security === "secure") return data;
    data.forEach((item) => {
      result.push({ id: item.id, type: item.type });
    });
    return result;
  }

  return -1;
};

const fetchDataTypes = (security) => {
  const result = [];
  if (security === "secure") {
    Object.keys(db).forEach((item) => {
      result.push({ type: item, count: db[item].length });
    });
    return result;
  }
  return Object.keys(db);
};

module.exports = {
  fetchDataFromDb,
  fetchDataTypes,
};

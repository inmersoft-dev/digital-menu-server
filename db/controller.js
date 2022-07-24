const { db } = require("./firebase");
const {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
} = require("firebase/firestore");

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Insert = async (table, key, value) => {
  await setDoc(doc(table, key), value);
};

/**
 * @param {string} table
 * @param {string} key
 * @param {any} value
 */
const Update = async (table, key, value) => {
  const dataRef = doc(db, table, key);
  const dataSnap = await getDoc(dataRef);
  if (dataSnap.exists()) {
    const localData = { ...dataSnap.data(), ...value };
    await setDoc(doc(table, key), localData);
  }
};

/**
 * @param {string} table
 * @param {string} key
 */
const GetValue = async (table, key) => {
  const dataRef = doc(db, table, key);
  const dataSnap = await getDoc(dataRef);
  if (dataSnap.exists()) return dataSnap.data();
  return undefined;
};

/**
 * @param {string} table
 */
const GetTable = async (table) => {
  const querySnapshot = await getDocs(collection(db, table));
  let resultList = [];
  querySnapshot.forEach((doc) => resultList.push(doc.data()));
  return resultList;
};

module.exports = {
  Insert,
  GetValue,
  GetTable,
  Update,
};

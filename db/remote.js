const firebase = require("firebase");
const config = require("../config");

const db = firebase.initializeApp(config.firebaseConfig);
const storage = firebase.storage();

module.exports = { db, storage };

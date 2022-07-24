const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");
const { getStorage } = require("firebase/storage");

const config = require("../config");

const firebaseConfig = {
  ...config.firebaseConfig,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

module.exports = { db, storage };

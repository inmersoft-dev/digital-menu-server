const { initializeApp } = require("firebase/app");
const { getFirestore } = require("firebase/firestore");

const config = require("../config");

// TODO: Replace the following with your app's Firebase project configuration
// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
  ...config.firebaseConfig,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

module.exports = db;

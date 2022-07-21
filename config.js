const dotenv = require("dotenv");

dotenv.config();

const {
  IMAGEKIT_URL,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} = process.env;

const config = {
  imagekitUrl: IMAGEKIT_URL,
  imagekitPublicKey: IMAGEKIT_PUBLIC_KEY,
  imagekitPrivateKey: IMAGEKIT_PRIVATE_KEY,
  // firebase
  firebaseConfig: {
    apiKey: API_KEY,
    authDomain: AUTH_DOMAIN,
    projectId: PROJECT_ID,
    storageBucket: STORAGE_BUCKET,
    messagingSenderId: MESSAGING_SENDER_ID,
    appId: APP_ID,
    measurementId: MEASUREMENT_ID,
  },
};

module.exports = config;

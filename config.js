const dotenv = require("dotenv");

dotenv.config();

const {
  IMAGEKIT_URL,
  IMAGEKIT_PUBLIC_KEY,
  IMAGEKIT_PRIVATE_KEY,
  FIREBASE_API_KEY,
  FIREBASE_AUTH_DOMAIN,
  FIREBASE_PROJECT_ID,
  FIREBASE_STORAGE_BUCKET,
  FIREBASE_MESSAGING_SENDER_ID,
  FIREBASE_APP_ID,
  FIREBASE_MEASUREMENT_ID,
  CLOUD_NAME,
  CLOUD_URL,
  API_KEY,
  API_SECRET,
} = process.env;

const config = {
  imagekitUrl: IMAGEKIT_URL,
  imagekitPublicKey: IMAGEKIT_PUBLIC_KEY,
  imagekitPrivateKey: IMAGEKIT_PRIVATE_KEY,
  // firebase
  firebaseConfig: {
    apiKey: FIREBASE_API_KEY,
    authDomain: FIREBASE_AUTH_DOMAIN,
    projectId: FIREBASE_PROJECT_ID,
    storageBucket: FIREBASE_STORAGE_BUCKET,
    messagingSenderId: FIREBASE_MESSAGING_SENDER_ID,
    appId: FIREBASE_APP_ID,
    measurementId: FIREBASE_MEASUREMENT_ID,
  },
  // cloudinary
  cloudinaryConfig: {
    cloud_name: CLOUD_NAME,
    cloud_url: CLOUD_URL,
    api_key: API_KEY,
    api_secret: API_SECRET,
  },
};

module.exports = config;

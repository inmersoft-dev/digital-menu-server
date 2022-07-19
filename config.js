const dotenv = require("dotenv");

dotenv.config();

const { IMAGEKIT_URL, IMAGEKIT_PUBLIC_KEY, IMAGEKIT_PRIVATE_KEY } = process.env;

const config = {
  imagekitUrl: IMAGEKIT_URL,
  imagekitPublicKey: IMAGEKIT_PUBLIC_KEY,
  imagekitPrivateKey: IMAGEKIT_PRIVATE_KEY,
};

module.exports = config;

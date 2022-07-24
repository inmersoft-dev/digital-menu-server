const { storage } = require("./firebase");
const { ref, uploadBytes } = require("firebase/storage");

const storageRef = ref(storage, "some-child");

const UploadFile = async (blob) => {
  const snapShot = await uploadBytes(storageRef, blob);
  console.log(snapShot);
  console.log("Uploaded a blob or file!");
};

module.exports = {
  UploadFile,
};

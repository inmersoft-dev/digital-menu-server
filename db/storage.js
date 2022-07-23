const firebase = require("./remote");

const storage = firebase.storage();

// Create a root reference
const storageRef = storage.ref();

const UploadFile = async (file) => {
  storageRef.put(file).then((snapshot) => {
    console.log("Uploaded a blob or file!");
    console.log(snapshot);
  });
};

module.exports = {
  UploadFile,
};

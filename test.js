const { UploadFile } = require("./db/storage");

const db = require("./db/db.json");

const main = async () => {
  await UploadFile(blob);
};

main();

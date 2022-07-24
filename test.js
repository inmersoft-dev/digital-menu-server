const { UploadFile } = require("./db/storage");
const { Blob } = require("node:buffer");

const db = require("./db/db.json");

const main = async () => {
  const blob = db.users.sito.l[2].ph.content;
  console.log(typeof blob);
  await UploadFile(new Blob([blob]));
};

main();

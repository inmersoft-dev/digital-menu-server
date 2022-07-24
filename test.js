const { UploadFile } = require("./db/storage");

const db = require("./db/db.json");

const main = async () => {
  const blob = db.users.sito.l[2].ph.content;
  await UploadFile(blob);
};

main();

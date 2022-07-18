const chalk = require("chalk");

const log = console.log;

const info = chalk.hex("#107d9c");
const good = chalk.hex("#69c473");
const error = chalk.hex("#fc3535");
const warning = chalk.hex("#FFA500"); // Orange color

module.exports = {
  log,
  info,
  good,
  error,
  warning,
};

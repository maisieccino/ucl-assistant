// https://github.com/facebook/react-native/issues/12241#issuecomment-300879473
const Path = require("path");

module.exports = {
  getProjectRoots: () => [__dirname, Path.join(__dirname, "..")],
};

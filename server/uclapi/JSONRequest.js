const fetch = require("node-fetch");

module.exports = (url, options = {}) =>
  fetch(url, {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...options.headers,
    },
    ...options,
  });

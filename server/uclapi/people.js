const { PEOPLE_SEARCH_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");

const search = async query => {
  if (!query) {
    throw new Error("Must provide a query!");
  }

  const url = `${PEOPLE_SEARCH_URL}?token=${process.env.UCLAPI_TOKEN}&query=${
    query
  }`;

  return JSONRequest(url);
};

module.exports = { search };

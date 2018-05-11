const { USER_TOKEN_URL, USER_DATA_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");

const getToken = async code => {
  const url = `${USER_TOKEN_URL}?client_id=${
    process.env.UCLAPI_CLIENT_ID
  }&client_secret=${process.env.UCLAPI_CLIENT_SECRET}&code=${code}`;
  console.log(url);
  return JSONRequest(url);
};

const getUserData = async token => {
  const url = `${USER_DATA_URL}?client_secret=${
    process.env.UCLAPI_CLIENT_SECRET
  }&token=${token}`;
  return JSONRequest(url);
};

module.exports = {
  getToken,
  getUserData,
};

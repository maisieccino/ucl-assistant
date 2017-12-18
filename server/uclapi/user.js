const { USER_TOKEN_URL, USER_DATA_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");

const getToken = async code => {
  const url = `${USER_TOKEN_URL}?client_id=${
    process.env.UCLAPI_CLIENT_ID
  }&client_secret=${process.env.UCLAPI_CLIENT_SECRET}&code=${code}`;
  console.log(url);
  const res = await JSONRequest(url);
  let json = {};
  try {
    json = await res.json();
  } catch (error) {
    // set a json value if it can't be parsed
    json = { body: await res.text() };
  }
  // fail gracefully if there was a problem.
  if (!res.ok || !json.ok) {
    throw new Error(json);
  }
  return json;
};

const getUserData = async token => {
  const url = `${USER_DATA_URL}?client_secret=${
    process.env.UCLAPI_CLIENT_SECRET
  }&token=${token}`;
  const res = await JSONRequest(url);
  let json = {};
  try {
    json = await res.json();
  } catch (error) {
    // set a json value if it can't be parsed
    json = { body: await res.text() };
  }
  // fail gracefully if there was a problem.
  if (!res.ok || !json.ok) {
    throw new Error(json);
  }
  return json;
};

module.exports = {
  getToken,
  getUserData,
};

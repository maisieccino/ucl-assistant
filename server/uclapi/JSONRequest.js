const fetch = require("node-fetch");

module.exports = async (url, { headers = {}, ...options } = {}) => {
  const res = await fetch(url, {
    ...options,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...headers,
    },
  });
  let json = {};
  try {
    json = await res.json();
  } catch (_) {
    json = { body: `Couldn't parse body` };
  }
  if (!res.ok) {
    throw new Error(JSON.stringify(json), "\n", 2);
  }
  return json;
};

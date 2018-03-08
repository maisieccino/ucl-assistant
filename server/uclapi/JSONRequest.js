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
  if (!res.headers["Content-Type"] === "application/json") {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text);
    }
    return text;
  }
  let json = {};
  json = await res.json();
  if (!res.ok) {
    throw new Error(JSON.stringify(json), "\n", 2);
  }
  return json;
};

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
  if (process.env.NODE_ENV === "development") {
    console.log(`requested ${url}, received ${res.status}`);
  }
  if (!res.headers["Content-Type"] === "application/json") {
    const text = await res.text();
    if (!res.ok) {
      throw new Error(text);
    }
    return text;
  }
  const text = await res.text();
  let json = {};
  try {
    json = JSON.parse(text);
  } catch (err) {
    throw new Error(`Couldn't parse JSON response:\n${text}`);
  }
  if (!res.ok) {
    throw new Error(JSON.stringify(json), "\n", 2);
  }
  return json;
};

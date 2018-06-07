const JSONRequest = require("../JSONRequest");

const { NOTIFICATION_API } = process.env;

const register = async (upi, pushToken) => {
  const res = await JSONRequest(`${NOTIFICATION_API}/register`, {
    body: {
      upi,
      pushToken,
    },
  });
  if (!res.ok) {
    throw new Error(`API Registration for user ${upi} failed:\n${res.text}`);
  }
};

module.exports = {
  register,
};

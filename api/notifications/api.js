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

const sendNotification = async (
  upi,
  notification = {
    title: "UCL Assistant",
    content: "",
    type: "default",
    path: "/",
  },
) => {
  const res = await JSONRequest(`${NOTIFICATION_API}/upi/${upi}/`, {
    body: notification,
  });

  if (!res.ok) {
    throw new Error(`Failed to send notification for user ${upi}:
    notification:
    ${JSON.stringify(notification)}
    error: ${res.text}`);
  }
};

module.exports = {
  register,
  sendNotification,
};

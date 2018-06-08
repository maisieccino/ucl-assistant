const JSONRequest = require("../JSONRequest");

const { NOTIFICATIONS_URL } = process.env;

const register = async (upi, pushToken) => {
  console.log("registering...");
  const res = await JSONRequest(`${NOTIFICATIONS_URL}/register`, {
    method: "POST",
    body: {
      upi,
      pushToken,
    },
  });
  if (!res.ok) {
    throw new Error(`API Registration for user ${upi} failed:\n${res.text}`);
  }
  console.log(await res.text());
  console.log("success!");
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
    method: "POST",
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

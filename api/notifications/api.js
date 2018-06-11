const JSONRequest = require("../JSONRequest");

const { NOTIFICATIONS_URL } = process.env;

const register = async (upi, pushToken) => {
  console.log("registering...");
  try {
    await JSONRequest(`${NOTIFICATIONS_URL}/register`, {
      method: "POST",
      body: JSON.stringify({
        upi,
        pushToken,
      }),
    });
  } catch (error) {
    throw new Error(
      `API Registration for user ${upi} failed:\n${error.message}`,
    );
  }
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
  try {
    await JSONRequest(`${NOTIFICATIONS_URL}/upi/${upi}/`, {
      method: "POST",
      body: JSON.stringify(notification),
    });
  } catch (error) {
    throw new Error(`Failed to send notification for user ${upi}:
    notification:
    ${JSON.stringify(notification)}
    error: ${error.messsage}`);
  }
};

module.exports = {
  register,
  sendNotification,
};

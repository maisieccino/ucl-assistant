const moment = require("moment");
const { PERSONAL_TIMETABLE_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");

const getPersonalTimetable = async (token, date = null) => {
  const datePart = date
    ? `&date_filter=${moment(date).format("YYYY-MM-DD")}`
    : "";
  const url = `${PERSONAL_TIMETABLE_URL}?client_secret=${
    process.env.UCLAPI_CLIENT_SECRET
  }&token=${token}${datePart}`;
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
    throw new Error(JSON.stringify(json), "\n", 2);
  }
  return json;
};

module.exports = {
  getPersonalTimetable,
};

const moment = require("moment");
const { MODULE_TIMETABLE_URL, PERSONAL_TIMETABLE_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");

const getPersonalTimetable = async (token, date = null) => {
  const datePart = date
    ? `&date_filter=${moment(date).format("YYYY-MM-DD")}`
    : "";
  const url = `${PERSONAL_TIMETABLE_URL}?client_secret=${
    process.env.UCLAPI_CLIENT_SECRET
  }&token=${token}${datePart}`;
  return JSONRequest(url);
};

const getModuleTimetable = async (token, module) => {
  const url = `${MODULE_TIMETABLE_URL}?client_secret=${
    process.env.UCLAPI_CLIENT_SECRET
  }&token=${token}&modules=${module}`;
  return JSONRequest(url);
};

module.exports = {
  getModuleTimetable,
  getPersonalTimetable,
};

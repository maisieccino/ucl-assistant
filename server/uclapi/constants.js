const API_URL = process.env.API_URL || "https://uclapi.com";
const TIMETABLE_BASE_URL = `${API_URL}/timetable`;
const WORKSPACES_BASE_URL = `${API_URL}/workspaces`;
module.exports = {
  API_URL,
  USER_TOKEN_URL: `${API_URL}/oauth/token`,
  USER_DATA_URL: `${API_URL}/oauth/user/data`,
  PERSONAL_TIMETABLE_URL: `${TIMETABLE_BASE_URL}/personal`,
  MODULE_TIMETABLE_URL: `${TIMETABLE_BASE_URL}/bymodule`,
  PEOPLE_SEARCH_URL: `${API_URL}/search/people`,
  WORKSPACE_IMAGE_URL: `${WORKSPACES_BASE_URL}/image`,
  WORKSPACE_SURVEYS_URL: `${WORKSPACES_BASE_URL}/surveys`,
};

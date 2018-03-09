export const DEEP_LINK_LOGIN = "UCLAssistant://+login";
export const API_URL = __DEV__
  ? "https://ucl-assistant.herokuapp.com"
  : "https://api.assistant.mbell.me";
export const TIMETABLE_URL = `${API_URL}/timetable`;
export const PEOPLE_URL = `${API_URL}/search`;
export const WORKSPACES_URL = `${API_URL}/workspaces`;

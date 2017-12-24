import user, { initialState as userState } from "./userReducer";
import timetable, { initialState as timetableState } from "./timetableReducers";

export const initialState = {
  user: userState,
  timetable: timetableState,
};

export default { user, timetable };

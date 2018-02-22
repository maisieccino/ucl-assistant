import user, { initialState as userState } from "./userReducer";
import timetable, { initialState as timetableState } from "./timetableReducers";
import people, { initialState as peopleState } from "./peopleReducer";

export const initialState = {
  user: userState,
  timetable: timetableState,
  people: peopleState,
};

export default { user, timetable, people };

import user, { initialState as userState } from "./userReducer";
import timetable, { initialState as timetableState } from "./timetableReducers";
import people, { initialState as peopleState } from "./peopleReducer";
import studyspaces, {
  initialState as studyspacesState,
} from "./studyspacesReducer";

export const initialState = {
  user: userState,
  timetable: timetableState,
  people: peopleState,
  studyspaces: studyspacesState,
};

export default { user, timetable, people, studyspaces };

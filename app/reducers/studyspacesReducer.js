import moment from "moment";
import { surveys } from "../constants/studyspaces";
import {
  WORKSPACES_FETCH_SEATINFO_FAILURE,
  WORKSPACES_IS_FETCHING_SEATINFO,
  WORKSPACES_FETCH_SEATINFO_SUCCESS,
  WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
} from "../constants/studyspacesConstants";

export const initialState = {
  studyspaces: surveys.map(survey => ({
    ...survey,
    occupied: 0,
    capacity: 0,
    fetchSeatInfoError: "",
    isFetchingSeatInfo: false,
    dailyAverages: Array.from(Array(24)).map(() => 0),
    isFetchingAverages: false,
    dailyAveragesError: "",
    lastUpdatedAverages: null,
  })),
  lastStatusUpdate: null,
  isFetchingSpaces: false,
};

export default (state = initialState, action = null) => {
  const { type, id, data, error, dailyAverages } = action;
  const space = id ? state.studyspaces.filter(s => s.id === id)[0] : null;

  switch (type) {
    case WORKSPACES_IS_FETCHING_SEATINFO: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, isFetchingSeatInfo: true, fetchSeatInfoError: "" },
        ];
        return { ...state, studyspaces: newStudyspaces };
      }
      return state;
    }

    case WORKSPACES_FETCH_SEATINFO_FAILURE: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, isFetchingSeatInfo: false, fetchSeatInfoError: error },
        ];
        return {
          ...state,
          studyspaces: newStudyspaces,
          lastStatusUpdate: moment(),
        };
      }
      return state;
    }

    case WORKSPACES_FETCH_SEATINFO_SUCCESS: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, ...data, isFetchingSeatInfo: false },
        ];
        return {
          ...state,
          studyspaces: newStudyspaces,
          lastStatusUpdate: moment(),
        };
      }
      return state;
    }

    case WORKSPACES_IS_FETCHING_HISTORIC_DATA: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          { ...space, isFetchingAverages: true, dailyAveragesError: "" },
        ];
        return {
          ...state,
          studyspaces: newStudyspaces,
        };
      }
      return state;
    }

    case WORKSPACES_FETCH_HISTORIC_DATA_FAILURE: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          {
            ...space,
            isFetchingAverages: false,
            dailyAveragesError: error,
            lastUpdatedAverages: moment(),
          },
        ];
        return {
          ...state,
          studyspaces: newStudyspaces,
          lastStatusUpdate: moment(),
        };
      }
      return state;
    }
    case WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS: {
      if (space) {
        const newStudyspaces = [
          ...state.studyspaces.filter(s => s.id !== id),
          {
            ...space,
            dailyAverages,
            isFetchingAverages: false,
            lastUpdatedAverages: moment(),
          },
        ];
        return {
          ...state,
          studyspaces: newStudyspaces,
          lastStatusUpdate: moment(),
        };
      }
      return state;
    }

    default:
      return state;
  }
};

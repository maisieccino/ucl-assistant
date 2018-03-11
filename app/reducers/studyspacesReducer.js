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
  studyspaces: surveys
    .map(survey => ({
      ...survey,
      occupied: 0,
      capacity: 0,
      fetchSeatInfoError: "",
      isFetchingSeatInfo: false,
      dailyAverages: Array.from(Array(24)).map(() => 0),
      isFetchingAverages: false,
      dailyAveragesError: "",
      lastUpdatedAverages: null,
    }))
    .sort((s1, s2) => s1.id - s2.id),
  lastStatusUpdate: null,
  isFetchingSpaces: false,
};

const updateStudyspaces = (studyspaces, id, newSpace) => {
  const idx = studyspaces.findIndex(s => s.id === id);
  const newStudyspaces = studyspaces.filter(s => s.id !== id);
  newStudyspaces.splice(idx, 0, newSpace);
  return newStudyspaces;
};

export default (state = initialState, action = null) => {
  const { type, id, data, error, dailyAverages } = action;
  const space = id ? state.studyspaces.filter(s => s.id === id)[0] : null;

  switch (type) {
    case WORKSPACES_IS_FETCHING_SEATINFO: {
      const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
        ...space,
        isFetchingSeatInfo: true,
        fetchSeatInfoError: "",
      });
      if (space) {
        return { ...state, studyspaces: newStudyspaces };
      }
      return state;
    }

    case WORKSPACES_FETCH_SEATINFO_FAILURE: {
      if (space) {
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...space,
          isFetchingSeatInfo: false,
          fetchSeatInfoError: error,
        });
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
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...space,
          ...data,
          isFetchingSeatInfo: false,
        });
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
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...space,
          isFetchingAverages: true,
          dailyAveragesError: "",
        });
        return {
          ...state,
          studyspaces: newStudyspaces,
        };
      }
      return state;
    }

    case WORKSPACES_FETCH_HISTORIC_DATA_FAILURE: {
      if (space) {
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...space,
          isFetchingAverages: false,
          dailyAveragesError: error,
          lastUpdatedAverages: moment(),
        });
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
        const newStudyspaces = updateStudyspaces(state.studyspaces, id, {
          ...space,
          dailyAverages,
          isFetchingAverages: false,
          lastUpdatedAverages: moment(),
        });
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

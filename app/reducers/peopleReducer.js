import {
  PEOPLE_IS_SEARCHING,
  PEOPLE_SEARCH_CLEAR,
  PEOPLE_SEARCH_FAILURE,
  PEOPLE_SEARCH_SUCCESS,
  PEOPLE_IS_FETCHING,
  PEOPLE_FETCH_SUCCESS,
  PEOPLE_FETCH_FAILURE,
  PEOPLE_MAX_RECENTS,
} from "../constants/peopleConstants";

const addToRecents = (recents = [], person) => {
  const newRecents = [person, ...recents];
  while (newRecents.length > PEOPLE_MAX_RECENTS) {
    newRecents.pop();
  }
  return newRecents;
};

export const initialState = {
  isSearching: false,
  isFetching: false,
  searchError: "",
  fetchError: "",
  searchResults: [],
  recents: [],
  person: {},
};

export default (state = initialState, action = null) => {
  const { type, results, error, person } = action;

  switch (type) {
    case "CLEAR": {
      return { ...initialState };
    }

    case PEOPLE_IS_SEARCHING: {
      return { ...state, isSearching: true, searchError: "" };
    }

    case PEOPLE_SEARCH_FAILURE: {
      return {
        ...state,
        searchResults: [],
        isSearching: false,
        searchError: error,
      };
    }

    case PEOPLE_SEARCH_SUCCESS: {
      return { ...state, searchResults: results, isSearching: false };
    }

    case PEOPLE_SEARCH_CLEAR: {
      return { ...state, searchResults: [] };
    }

    case PEOPLE_IS_FETCHING: {
      return { ...state, isFetching: true, fetchError: "" };
    }

    case PEOPLE_FETCH_FAILURE: {
      return { ...state, isFetching: false, fetchError: error };
    }

    case PEOPLE_FETCH_SUCCESS: {
      const newRecents = addToRecents(state.recents, person);
      return { ...state, isFetching: false, person, recents: newRecents };
    }

    default:
      return state;
  }
};

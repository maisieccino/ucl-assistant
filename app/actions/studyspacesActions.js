// @flow
import { WORKSPACES_URL } from "../constants/API";
import {
  WORKSPACES_FETCH_SEATINFO_FAILURE,
  WORKSPACES_IS_FETCHING_SEATINFO,
  WORKSPACES_FETCH_SEATINFO_SUCCESS,
  WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
  WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
  WORKSPACES_IS_FETCHING_HISTORIC_DATA,
  STUDYSPACE_TOGGLE_FAVOURITE,
  STUDYSPACE_IS_FETCHING_DETAIL,
  STUDYSPACE_FETCHING_DETAIL_SUCCESS,
  STUDYSPACE_FETCHING_DETAIL_FAILURE,
} from "../constants/studyspacesConstants";

export const setIsFetchingSeatInfo = ids => ({
  ids,
  type: WORKSPACES_IS_FETCHING_SEATINFO,
});

// export const fetchSeatInfoSuccess = (id, data) => ({
//   id,
//   data,
//   type: WORKSPACES_FETCH_SEATINFO_SUCCESS,
// });

export const fetchSeatInfoSuccess = (ids, data) => ({
  ids,
  data,
  type: WORKSPACES_FETCH_SEATINFO_SUCCESS,
});

export const fetchSeatInfoFailure = (id, error) => ({
  id,
  error,
  type: WORKSPACES_FETCH_SEATINFO_FAILURE,
});

export const fetchSeatInfo = (token, id) => async dispatch => {
  await dispatch(setIsFetchingSeatInfo([id]));
  try {
    const res = await fetch(`${WORKSPACES_URL}/${id}/seatinfo`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(
      fetchSeatInfoSuccess(id, {
        occupied: json.content.occupied,
        capacity: json.content.total,
      }),
    );
  } catch (error) {
    return dispatch(
      fetchSeatInfoFailure(
        id,
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const fetchSeatInfos = (token: String, ids: Array) => async (
  dispatch: Function,
) => {
  console.log("setting isFetching to true...");
  await dispatch(setIsFetchingSeatInfo(ids));
  try {
    console.log("requesting data...");
    const res = await fetch(`${WORKSPACES_URL}/summary`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    console.log("data received");
    return dispatch(fetchSeatInfoSuccess(ids, json.content));
  } catch (error) {
    return Promise.all(
      ids.map(id =>
        dispatch(
          fetchSeatInfoFailure(
            id,
            typeof error === "string" ? error : error.message,
          ),
        ),
      ),
    );
  }
};

export const setIsFetchingAverages = id => ({
  id,
  type: WORKSPACES_IS_FETCHING_HISTORIC_DATA,
});

export const fetchAveragesSuccess = (id, dailyAverages) => ({
  id,
  dailyAverages,
  type: WORKSPACES_FETCH_HISTORIC_DATA_SUCCESS,
});

export const fetchAveragesFailure = (id, error) => ({
  id,
  error,
  type: WORKSPACES_FETCH_HISTORIC_DATA_FAILURE,
});

export const fetchAverages = (token: String, id: Number) => async (
  dispatch: Function,
) => {
  await dispatch(setIsFetchingAverages(id));
  try {
    const res = await fetch(`${WORKSPACES_URL}/historic?id=${id}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(fetchAveragesSuccess(id, json.content));
  } catch (error) {
    return dispatch(
      fetchAveragesFailure(
        id,
        typeof error === "string" ? error : error.message,
      ),
    );
  }
};

export const toggleFavourite = id => ({
  id,
  type: STUDYSPACE_TOGGLE_FAVOURITE,
});

export const setIsFetchingDetail = id => ({
  id,
  type: STUDYSPACE_IS_FETCHING_DETAIL,
});

export const fetchDetailSuccess = (id, data) => ({
  id,
  data,
  type: STUDYSPACE_FETCHING_DETAIL_SUCCESS,
});

export const fetchDetailFailure = (id, error) => ({
  id,
  error,
  type: STUDYSPACE_FETCHING_DETAIL_FAILURE,
});

export const fetchDetail = (token: String, id: Number) => async (
  dispatch: () => Promise,
) => {
  await dispatch(setIsFetchingDetail(id));
  try {
    const res = await fetch(`${WORKSPACES_URL}/${id}/`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      throw new Error(json.error || "There was a problem");
    }
    return dispatch(fetchDetailSuccess(id, json.content));
  } catch (error) {
    return dispatch(
      fetchDetailFailure(id, typeof error === "string" ? error : error.message),
    );
  }
};

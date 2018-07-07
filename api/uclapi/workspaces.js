const fetch = require("node-fetch");
const moment = require("moment");
const {
  WORKSPACE_IMAGE_URL,
  WORKSPACE_SUMMARY_URL,
  WORKSPACE_HISTORIC_URL,
} = require("./constants");
const JSONRequest = require("../JSONRequest");
const surveyList = require("./surveysList");
const details = require("./studyspaceDetails");

const getWorkspaces = () =>
  surveyList.surveys.map(survey => ({ name: survey.name, id: survey.id }));

const getImage = async imageId =>
  fetch(
    `${WORKSPACE_IMAGE_URL}?token=${process.env.UCLAPI_TOKEN}&image_id=${
      imageId
    }&image_format=raw`,
  );

/**
 * Takes a list of maps, returns a an object with number of occupied seats
 * and a number of total seats.
 *
 * @param {any} maps
 */
const reduceSeatInfo = maps =>
  maps.reduce(
    (obj, map) => {
      const capacity =
        map.sensors_absent + map.sensors_other + map.sensors_occupied;
      return {
        occupied: obj.occupied + map.sensors_occupied,
        total: obj.total + capacity,
      };
    },
    { occupied: 0, total: 0 },
  );

const getSeatingInfo = async surveyId => {
  const data = await JSONRequest(
    `${WORKSPACE_SUMMARY_URL}?token=${process.env.UCLAPI_TOKEN}&survey_ids=${
      surveyId
    }`,
  );
  const { surveys } = data;
  if (surveys.length !== 1) {
    throw new Error("Survey with that id not found.");
  }
  return reduceSeatInfo(surveys[0].maps);
};

const reduceAverageData = averages => {
  const returnArray = Array.from(Array(24)).map(() => 0);
  const hours = Object.keys(averages).map(time => ({
    time,
    hour: moment(time, "HH:mm:ss").hours(),
    occupied: averages[time].sensors_occupied,
  }));
  return returnArray.map((_, i) => {
    const avrObj = hours.reduce(
      (acc, obj) =>
        obj.hour === i
          ? { total: acc.total + obj.occupied, count: acc.count + 1 }
          : acc,
      { total: 0, count: 0 },
    );
    return avrObj.total / avrObj.count;
  });
};

const getHistoricSeatInfo = async surveyId => {
  const data = await JSONRequest(
    `${WORKSPACE_HISTORIC_URL}?token=${process.env.UCLAPI_TOKEN}&survey_ids=${
      surveyId
    }&days=30`,
  );
  const { surveys } = data;
  if (surveys.length !== 1) {
    throw new Error("Survey with that id not found");
  }
  const { averages } = surveys[0];
  return reduceAverageData(averages);
};

const getAllSeatInfo = async () => {
  const data = await JSONRequest(
    `${WORKSPACE_SUMMARY_URL}?token=${process.env.UCLAPI_TOKEN}`,
  );
  const { surveys } = data;
  return surveys.map(survey => ({
    ...reduceSeatInfo(survey.maps),
    name: survey.name,
    id: survey.id,
  }));
};

const getDetail = surveyId => {
  const data = {
    maps: surveyList.filter(survey => survey.id === surveyId)[0].maps,
    ...(details[surveyId] || {}),
  };
  return data;
};

module.exports = {
  reduceAverageData,
  getWorkspaces,
  getImage,
  getSeatingInfo,
  getAllSeatInfo,
  getHistoricSeatInfo,
  getDetail,
};

const fetch = require("node-fetch");
const { WORKSPACE_IMAGE_URL, WORKSPACE_SUMMARY_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");
const surveyList = require("./surveysList");

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

module.exports = {
  getWorkspaces,
  getImage,
  getSeatingInfo,
  getAllSeatInfo,
};

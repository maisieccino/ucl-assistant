const fetch = require("node-fetch");
const { WORKSPACE_IMAGE_URL, WORKSPACE_SENSORS_URL } = require("./constants");
const JSONRequest = require("./JSONRequest");
const surveys = require("./surveysList");

const getWorkspaces = () =>
  surveys.surveys.map(survey => ({ name: survey.name, id: survey.id }));

const getImage = async imageId =>
  fetch(
    `${WORKSPACE_IMAGE_URL}?token=${process.env.UCLAPI_TOKEN}&image_id=${
      imageId
    }&image_format=raw`,
  );

const getSeatingInfo = async (token, surveyId) => {
  const data = await JSONRequest(
    `${WORKSPACE_SENSORS_URL}?token=${token}&survey_id=${
      surveyId
    }&return_states=true`,
  );
  return data.maps.reduce(
    (obj, map) => {
      const { occupied, total } = Object.keys(map.sensors)
        .map(id => map.sensors[id])
        .reduce(
          (object, sensor) => ({
            total: object.total + 1,
            occupied:
              sensor.last_trigger_type.toLowerCase() === "occupied"
                ? object.occupied + 1
                : object.occupied,
          }),
          { occupied: 0, total: 0 },
        );
      return { occupied: obj.occupied + occupied, total: obj.total + total };
    },
    { occupied: 0, total: 0 },
  );
};

module.exports = {
  getWorkspaces,
  getImage,
  getSeatingInfo,
};
